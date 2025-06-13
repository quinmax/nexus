import React, { useState, useEffect, useCallback, useContext } from 'react'; // Import useContext
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'; // Added ActivityIndicator
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import { JsonRpcProvider, Contract } from 'ethers';

import ProfileIcon from '../assets/ProfileIcon.jsx';
import CopyIcon from '../assets/CopyIcon.jsx';
import RefreshIcon from '../assets/RefreshIcon.jsx'; // Corrected import path
import BottomNavBar from '../components/BottomNavBar.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';
import { AuthContext } from '../context/AuthContext.jsx'; // Import AuthContext
import { AppSettingsContext } from '../context/AppSettingsContext.jsx'; // Import AppSettingsContext

// Define your Laravel backend URL here
const LARAVEL_BACKEND_URL = "http://192.168.23.113"; // Replace with your actual backend IP if different

const ProfileScreen = ({ route, navigation }) => {
  const { user, logout, isLoading: isAuthLoading, token } = useContext(AuthContext); // Get user and logout from AuthContext
  const { appSettings, isLoadingSettings, settingsError, fetchAppSettings: refreshAppSettings } = useContext(AppSettingsContext); // Get appSettings from AppSettingsContext

  // Use user from context directly
  const currentUser = user || {}; // Fallback to empty object if user is null

  const [nftCount, setNftCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [balanceError, setBalanceError] = useState('');

  const erc1155Abi = [
    "function balanceOf(address account, uint256 id) external view returns (uint256)"
  ];

  // No need for local app settings fetching, it's handled by AppSettingsContext
  // initialAppSettingsLoadDone is replaced by !isLoadingSettings

  const fetchWalletData = useCallback(async () => {
    if (!currentUser.blockchain_wallet_address) {
      setBalanceError("User blockchain address not available.");
      setIsLoadingBalance(false);
      return;
    }

    if (!appSettings || !appSettings.alchemy_rpc_url || typeof appSettings.gold_price_per_gram !== 'number') {
      // Don't proceed if app settings are not loaded or incomplete
      if (!isLoadingSettings) { // Only set error if initial settings loading is finished but settings are bad
          setBalanceError("Application settings are missing or invalid.");
      }
      setIsLoadingBalance(false);
      return;
    }

    setIsLoadingBalance(true);
    setBalanceError(''); // Clear any previous error on a new fetch attempt
    // Do not reset nftCount and totalValue here to avoid flicker during refresh

    try {
      // Ensure appSettings are valid before proceeding
      const provider = new JsonRpcProvider(appSettings.alchemy_rpc_url);

      // 1. Fetch tracked NFT details from your backend
      const trackedNftsResponse = await axios.get(`${LARAVEL_BACKEND_URL}/api/assets/tracked-nft-details`);
      const trackedNfts = trackedNftsResponse.data;

      if (!Array.isArray(trackedNfts) || trackedNfts.length === 0) {
        console.log("No tracked NFTs found in the database.");
        setNftCount(0);
        setTotalValue(0); // Ensure totalValue is also zero if no NFTs
        return; // Return early as there's nothing more to process
      }

      // 2. Fetch NFT balances
      let currentNftCount = 0;
      console.log(`Checking balances for ${trackedNfts.length} tracked NFTs for wallet: ${currentUser.blockchain_wallet_address}`);
      for (const nft of trackedNfts) {
        if (nft.blockchain_address && nft.token_id !== null && nft.token_id !== undefined) {
          try {
            const contract = new Contract(nft.blockchain_address, erc1155Abi, provider);
            const balance = await contract.balanceOf(currentUser.blockchain_wallet_address, nft.token_id);
            currentNftCount += Number(balance);
          } catch (contractError) {
            console.error(`Error querying NFT balance for contract ${nft.blockchain_address}, token ID ${nft.token_id}:`, contractError.message);
          }
        }
      }
      setNftCount(currentNftCount);
      console.log("Total NFT count:", currentNftCount);

      // 3. If NFTs exist, use fetched gold price from appSettings
      if (currentNftCount > 0) {
        const pricePerGram = appSettings.gold_price_per_gram;
        setTotalValue((currentNftCount / 1000) * pricePerGram);
        console.log(`Using gold price per gram from settings: ${pricePerGram}`);
      } else {
        // If NFT count becomes 0 after fetch, ensure total value is also 0
        setTotalValue(0);
      }
    } catch (error) {
      console.error("Error in fetchWalletData:", error.response ? error.response.data : error.message);
      if (axios.isAxiosError(error) && error.response) {
          console.error("Axios error status:", error.response.status);
          console.error("Axios error data:", error.response.data);
      }
      setBalanceError("Could not load wallet data.");
      // Optionally, clear nftCount and totalValue on error if you don't want to show stale data
      // setNftCount(0);
      // setTotalValue(0);
    } finally {
      setIsLoadingBalance(false);
    }
  }, [currentUser.blockchain_wallet_address, appSettings, isLoadingSettings]);

  // useEffect for wallet data fetch (when user, appSettings, or initial load status changes)
  useEffect(() => {
    if (currentUser.blockchain_wallet_address && appSettings && !isLoadingSettings && !settingsError && !isAuthLoading) {
        fetchWalletData();
    } else if (!isLoadingSettings && (!appSettings || settingsError)) {
        setIsLoadingBalance(false); // Ensure balance loading stops
        // Error for balance will be set by fetchWalletData if appSettings are bad,
        // or appSettingsError will be shown at a higher level.
        if (!settingsError && !appSettings) { // If no specific app settings error, but settings are null
            setBalanceError("App settings unavailable for balance calculation.");
        }
    } else if (isAuthLoading || isLoadingSettings) {
        setIsLoadingBalance(true);
    }
  }, [currentUser.blockchain_wallet_address, appSettings, isLoadingSettings, settingsError, isAuthLoading, fetchWalletData]);

  const handleCopy = (textToCopy) => {
    if (textToCopy && textToCopy !== 'N/A') {
      Clipboard.setString(textToCopy);
      Alert.alert('Copied!', `${textToCopy} copied to clipboard.`);
    }
  };

  const handleLogout = async () => {
    console.log('User logging out');
    await logout(); // Call logout from AuthContext
    navigation.navigate('Login');
  };

  const handleRefreshBalance = () => {
    console.log("Manual refresh triggered for profile balance.");
    refreshAppSettings(); // This will trigger appSettings update, then fetchWalletData
  };

  // Helper to format currency
  const formatCurrency = (value) => {
    if (typeof value !== 'number') return '0.00'; // Or handle as an error/default
    const parts = value.toFixed(2).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  // Combined loading state for initial screen render
  if (isAuthLoading || (isLoadingSettings && !appSettings) ) { // Show loading if auth is loading OR settings are loading for the first time
    return (
      <View style={styles.safeArea}>
        <ScreenHeader title="PROFILE" RightIconComponent={ProfileIcon} />
        <View style={styles.centeredMessageContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading Profile...</Text>
        </View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }

  // Show error if initial settings load failed and we don't have any settings
  // Or if user is not available after auth loading
  if ((settingsError && !appSettings) || (!currentUser.id && !isAuthLoading)) {
    return (
      <View style={styles.safeArea}>
        <ScreenHeader title="PROFILE" RightIconComponent={ProfileIcon} />
        <View style={styles.centeredMessageContainer}>
          <Text style={styles.errorTextLarge}>{settingsError || "User data not available."}</Text>
        </View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="PROFILE" RightIconComponent={ProfileIcon} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profileInfoContainer}>
          <View style={styles.walletBalanceRow}>
            <View style={styles.walletBalanceContainer}>
              <Text style={styles.walletBalanceLabel}>Wallet balance</Text>
              {isLoadingBalance ? (
                <Text style={styles.walletBalanceAmount}>Loading...</Text>
              ) : balanceError ? (
                <Text style={[styles.walletBalanceAmount, styles.errorTextSmall]}>{balanceError}</Text>
              ) : nftCount > 0 && appSettings && typeof appSettings.gold_price_per_gram === 'number' ? (
                <Text style={styles.walletBalanceAmount}>
                  R {formatCurrency(totalValue)}
                </Text>
              ) : (
                <Text style={styles.walletBalanceAmount}>ZAR 0.00</Text>
              )}
              {settingsError && appSettings && ( // Show settings error even if we have stale appSettings
                <Text style={[styles.errorTextSmall, {fontSize: typography.caption.fontSize, marginTop: spacing.xs}]}>{settingsError}</Text>
              )}
              {appSettings && typeof appSettings.gold_price_per_gram === 'number' && !isLoadingBalance && !balanceError && !settingsError && (
                   <Text style={styles.goldPriceInfoText}>
                      Current gold price R {formatCurrency(appSettings.gold_price_per_gram)} /Oz
                   </Text>
              )}
            </View>
            <TouchableOpacity onPress={handleRefreshBalance} style={styles.refreshButton}>
              <RefreshIcon width={24} height={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Account details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account name</Text>
            <Text style={styles.detailValue}>{currentUser.account_name || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Full name</Text>
            <Text style={styles.detailValue}>{currentUser.full_name || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email address</Text>
            <Text style={styles.detailValue}>{currentUser.email || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Blockchain address</Text>
            <TouchableOpacity onPress={() => handleCopy(currentUser.blockchain_wallet_address)} style={styles.copyableValueContainer}>
              <Text style={styles.detailValue} numberOfLines={1} ellipsizeMode="middle">
                {currentUser.blockchain_wallet_address || 'N/A'}
              </Text>
              {currentUser.blockchain_wallet_address && currentUser.blockchain_wallet_address !== 'N/A' && (
                <CopyIcon width={18} height={18} color={colors.primary} style={styles.copyIcon} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Fulldetails')} // Fulldetails will also use context
          >
            <Text style={styles.actionButtonText}>VIEW FULL DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.logoutButton]} // Apply base and specific logout styles
            onPress={handleLogout}
          >
            <Text style={[styles.actionButtonText, styles.logoutButtonText]}>LOG OUT</Text>
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
    paddingBottom: spacing.xl + spacing.xl, // Ensure space for BottomNavBar
  },
  centeredMessageContainer: { // For loading/error messages
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.containerPadding,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  errorTextLarge: {
    ...typography.h3,
    color: colors.error,
    textAlign: 'center',
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
  walletBalanceRow: { // New style to hold balance and refresh button
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Puts space between balance block and refresh button
    width: '100%', // Ensure it takes full width of its parent
  },
  walletBalanceContainer: {
    alignItems: 'flex-start', // Align text to the start
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
  goldPriceInfoText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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
  logoutButton: { // Specific style for the logout button
    backgroundColor: colors.surface, // Lighter background like Confirm.jsx's Cancel button
    borderColor: '#1f2531',         // Border color matching the dark buttons
    borderWidth: borders.borderWidth,
  },
  logoutButtonText: { // Specific text style for logout button if needed
    color: colors.primaryButtonText, // Changed to use the theme's primary button text color (likely white)
  },
  errorTextSmall: {
    color: colors.error,
    fontSize: 16, // typography.body.fontSize might be better
    textAlign: 'center',
  },
  refreshButton: {
    padding: spacing.s,
    // Add more styling if using an icon, e.g., marginLeft: spacing.m
  },
});

export default ProfileScreen;
