import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import { ethers } from 'ethers'; // Import ethers

import ProfileIcon from '../assets/ProfileIcon.jsx';
import CopyIcon from '../assets/CopyIcon.jsx';
import BottomNavBar from '../components/BottomNavBar.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';

const ProfileScreen = ({ route, navigation }) => {
  // IMPORTANT: Replace with your actual RPC URL for the blockchain you are targeting (e.g., Base, Polygon, Ethereum)
  // You might get this from Alchemy, Infura, or another node provider.
  const RPC_URL = 'https://base-mainnet.g.alchemy.com/v2/zh11Hx1m70K9ZNDgU6Wkt'; // EXAMPLE for Base - REPLACE THIS
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const user = route.params?.user || {};
  const [nftCount, setNftCount] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [balanceError, setBalanceError] = useState('');

  const handleCopy = (textToCopy) => {
    if (textToCopy && textToCopy !== 'N/A') {
      Clipboard.setString(textToCopy);
      Alert.alert('Copied!', `${textToCopy} copied to clipboard.`);
    }
  };

  const handleLogout = () => {
    // Implement actual logout logic (e.g., clear token, navigate to Login)
    console.log('User logging out');
    navigation.navigate('Login');
  };

  // Minimal ERC1155 ABI for balanceOf
  const erc1155Abi = [
    "function balanceOf(address account, uint256 id) external view returns (uint256)"
  ];

  useEffect(() => {
    const fetchWalletBalanceData = async () => {
      if (!user.blockchain_wallet_address) {
        setBalanceError("User blockchain address not available.");
        setIsLoadingBalance(false);
        return;
      }

      setIsLoadingBalance(true);
      setBalanceError('');
      try {
        // 1. Fetch asset contract addresses from your backend
        const response = await axios.get('http://192.168.23.113/api/assets/tracked-nft-details'); // Updated endpoint, ensure IP is correct
        const trackedNfts = response.data; // This will be an array like [{ blockchain_address: "0x...", token_id: "0" }, ...]

        if (!Array.isArray(trackedNfts) || trackedNfts.length === 0) {
          console.log("No tracked NFTs found in the database.");
          setNftCount(0);
          setIsLoadingBalance(false);
          return;
        }

        let totalUserNfts = 0;
        console.log(`Checking balances for ${trackedNfts.length} tracked NFTs for wallet: ${user.blockchain_wallet_address}`);

        for (const nft of trackedNfts) {
          if (nft.blockchain_address && nft.token_id !== null && nft.token_id !== undefined) {
            try {
              const contract = new ethers.Contract(nft.blockchain_address, erc1155Abi, provider);
              console.log(`Querying contract ${nft.blockchain_address} for token ID ${nft.token_id}`);
              const balance = await contract.balanceOf(user.blockchain_wallet_address, nft.token_id);
              const balanceNum = balance.toNumber(); // Convert BigNumber to number
              console.log(`Balance for token ID ${nft.token_id}: ${balanceNum}`);
              totalUserNfts += balanceNum;
            } catch (contractError) {
              console.error(`Error querying NFT balance for contract ${nft.blockchain_address}, token ID ${nft.token_id}:`, contractError.message);
              // Optionally, you could set a partial error state or just log and continue
            }
          }
        }
        setNftCount(totalUserNfts);
      } catch (error) {
        console.error("Error in fetchWalletBalanceData:", error.response ? error.response.data : error.message);
        setBalanceError("Could not load balance.");
      } finally {
        setIsLoadingBalance(false);
      }
    };

    fetchWalletBalanceData();
  }, [user.blockchain_wallet_address]); 

  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="PROFILE" RightIconComponent={ProfileIcon} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profileInfoContainer}>
          <View style={styles.walletBalanceContainer}>
            <Text style={styles.walletBalanceLabel}>Wallet balance</Text>
            {isLoadingBalance ? (
              <Text style={styles.walletBalanceAmount}>Loading...</Text>
            ) : balanceError ? (
              <Text style={[styles.walletBalanceAmount, styles.errorTextSmall]}>{balanceError}</Text>
            ) : (
              <Text style={styles.walletBalanceAmount}>{nftCount} NFTs</Text>
            )}
          </View>
        </View>

        {/* User Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Account details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account name</Text>
            <Text style={styles.detailValue}>{user.account_name || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Full name</Text>
            <Text style={styles.detailValue}>{user.full_name || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email address</Text>
            <Text style={styles.detailValue}>{user.email || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Blockchain address</Text>
            <TouchableOpacity onPress={() => handleCopy(user.blockchain_wallet_address)} style={styles.copyableValueContainer}>
              <Text style={styles.detailValue} numberOfLines={1} ellipsizeMode="middle">
                {user.blockchain_wallet_address || 'N/A'}
              </Text>
              {user.blockchain_wallet_address && user.blockchain_wallet_address !== 'N/A' && (
                <CopyIcon width={18} height={18} color={colors.primary} style={styles.copyIcon} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Fulldetails', { user: user })}
          >
            <Text style={styles.actionButtonText}>VIEW FULL DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Text style={styles.actionButtonText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...commonStyles.safeArea,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: spacing.xl + spacing.xl, 
  },
  profileInfoContainer: {
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.l,
    alignItems: 'center',
    backgroundColor: colors.surface, 
    borderRadius: borders.radiusMedium,
    marginHorizontal: spacing.containerPadding,
    marginTop: spacing.l,
  },
  walletBalanceContainer: {
    alignItems: 'center',
  },
  walletBalanceLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.s,
  },
  walletBalanceAmount: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  detailsSection: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.containerPadding,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderBottomWidth: borders.borderWidth,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    ...typography.label,
    color: colors.textSecondary,
    flex: 1, 
  },
  detailValue: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 2, 
    textAlign: 'right',
  },
  copyableValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  copyIcon: {
    marginLeft: spacing.s,
  },
  actionsSection: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.containerPadding,
  },
  actionButton: {
    backgroundColor: '#1f2531', 
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  actionButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  errorTextSmall: {
    // ...typography.body, // Or a smaller typography if needed
    color: colors.error,
    fontSize: 16, 
  }
});

export default ProfileScreen;
