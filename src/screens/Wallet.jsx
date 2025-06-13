import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { JsonRpcProvider, Contract } from 'ethers';

import WalletIcon from '../assets/WalletIcon.jsx';
import KingdomCoinImage from '../assets/Kingdom_Coin_w.jpg';
import BottomNavBar from '../components/BottomNavBar.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import RefreshIcon from '../assets/RefreshIcon.jsx';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';
import { AuthContext } from '../context/AuthContext.jsx';
import { AppSettingsContext } from '../context/AppSettingsContext.jsx';


const LARAVEL_BACKEND_URL = "http://192.168.23.113";

const CoinCard = ({ title, displayMetricValue, imageSrc, details, onViewFullDetailsPress, displayValue }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  const toggleExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardQtyTag}>Total Oz owned : {displayMetricValue}</Text>
      </View>
      <Image source={imageSrc} style={styles.coinImage} />

      <TouchableOpacity onPress={toggleExpansion} style={styles.expandCollapseButton}>
        <Text style={styles.expandCollapseButtonText}>
          {isExpanded ? 'Hide Details [-]' : 'Show Details [+]'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.detailsContent}>
          <View style={styles.detailsListContainer}>
            {details.map((item, index) => (
              <Text key={index} style={styles.detailItemText}>{item}</Text>
            ))}
          </View>
          <TouchableOpacity onPress={onViewFullDetailsPress} style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsLink}>View full coin details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Wallet = ({ route, navigation }) => { 
  const { user, isLoading: isAuthLoading } = useContext(AuthContext);
  const { appSettings, isLoadingSettings, settingsError, fetchAppSettings: refreshAppSettings } = useContext(AppSettingsContext);

  const passedUser = user || {}; 

  const [nftCount, setNftCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [totalOzOwned, setTotalOzOwned] = useState(0);
  
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [balanceError, setBalanceError] = useState('');
  
  const erc1155Abi = [
    "function balanceOf(address account, uint256 id) external view returns (uint256)"
  ];

  const handleViewCoinDetails = (coinName) => {
    console.log(`Navigate to full details for ${coinName}`);
    // navigation.navigate('CoinDetails', { coinName }); // Example navigation
  };

  const formatCurrency = (value) => {
    if (typeof value !== 'number') return '0.00';
    const parts = value.toFixed(2).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  const fetchWalletData = useCallback(async () => {
    if (!passedUser.blockchain_wallet_address) {
      setBalanceError("User blockchain address not available.");
      setIsLoadingBalance(false);
      return;
    }

    if (!appSettings || !appSettings.alchemy_rpc_url || typeof appSettings.gold_price_per_gram !== 'number') {
      if (!isLoadingSettings) {
        setBalanceError("Application settings are missing or invalid for balance calculation.");
      }
      setIsLoadingBalance(false);
      return;
    }

    setIsLoadingBalance(true);
    setBalanceError('');

    try {
      const provider = new JsonRpcProvider(appSettings.alchemy_rpc_url);
      const trackedNftsResponse = await axios.get(`${LARAVEL_BACKEND_URL}/api/assets/tracked-nft-details`);
      const trackedNfts = trackedNftsResponse.data;

      if (!Array.isArray(trackedNfts) || trackedNfts.length === 0) {
        setNftCount(0);
        setTotalValue(0);
        setTotalOzOwned(0);
        setIsLoadingBalance(false); // Ensure loading stops
        return;
      }

      let currentNftCount = 0;
      for (const nft of trackedNfts) {
        if (nft.blockchain_address && nft.token_id !== null && nft.token_id !== undefined) {
          try {
            const contract = new Contract(nft.blockchain_address, erc1155Abi, provider);
            const balance = await contract.balanceOf(passedUser.blockchain_wallet_address, nft.token_id);
            currentNftCount += Number(balance);
          } catch (contractError) {
            console.error(`Wallet.jsx: Error querying NFT balance for ${nft.blockchain_address}, token ${nft.token_id}:`, contractError.message);
          }
        }
      }
      setNftCount(currentNftCount);
      setTotalOzOwned(currentNftCount / 1000);

      if (currentNftCount > 0) {
        const pricePerGram = appSettings.gold_price_per_gram;
        setTotalValue((currentNftCount / 1000) * pricePerGram);
      } else {
        setTotalValue(0);
      }
    } catch (error) {
      console.error("Wallet.jsx: Error in fetchWalletData:", error.message);
      setBalanceError("Could not load wallet data.");
    } finally {
      setIsLoadingBalance(false);
    }
  }, [passedUser.blockchain_wallet_address, appSettings, isLoadingSettings]);
  
  useEffect(() => {
    if (passedUser.blockchain_wallet_address && appSettings && !isLoadingSettings && !settingsError && !isAuthLoading) {
      fetchWalletData();
    } else if (!isLoadingSettings && (!appSettings || settingsError)) {
      setIsLoadingBalance(false);
      if (!settingsError && !appSettings) {
        setBalanceError("App settings unavailable for balance calculation.");
      }
    } else if (isAuthLoading || isLoadingSettings) {
      setIsLoadingBalance(true);
    }
  }, [passedUser.blockchain_wallet_address, appSettings, isLoadingSettings, settingsError, isAuthLoading, fetchWalletData]);

  const handleRefreshBalance = () => {
    console.log("Wallet.jsx: Manual refresh triggered for balance.");
    refreshAppSettings(); 
  };

  if (isAuthLoading || (isLoadingSettings && !appSettings)) { 
    return (
      <View style={commonStyles.safeArea}>
        <ScreenHeader title="WALLET" RightIconComponent={WalletIcon} />
        <View style={styles.centeredMessageContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading Wallet...</Text>
        </View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }

  if (settingsError && !appSettings) { 
    return (
      <View style={commonStyles.safeArea}>
        <ScreenHeader title="WALLET" RightIconComponent={WalletIcon} />
        <View style={styles.centeredMessageContainer}>
          <Text style={[styles.errorTextSmall, {textAlign: 'center'}]}>{settingsError}</Text>
          <TouchableOpacity onPress={handleRefreshBalance} style={{marginTop: spacing.m}}>
            <Text style={commonStyles.linkText}>Try Again</Text>
          </TouchableOpacity>
        </View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }

  let vaultVerifiedText = "Vault verified: N/A"; 
  let coinDetails = [
    "Current value per coin: Loading...", 
    vaultVerifiedText,                    
  ];
    if (appSettings && !settingsError) { 
      if (appSettings.last_audit) {
        try {
          const date = new Date(appSettings.last_audit);
          coinDetails[1] = `Vault verified: ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        } catch (e) {
          console.error("Error formatting last_audit date:", e);
          coinDetails[1] = "Vault verified: Invalid Date";
        }
      } else {
        coinDetails[1] = "Vault verified: N/A";
      }
      
      if (typeof appSettings.gold_price_per_gram === 'number') {
        coinDetails[0] = `Current value per coin: R ${formatCurrency(appSettings.gold_price_per_gram)}`;
      } else {
        coinDetails[0] = "Current value per coin: N/A";
      }
    } else { 
      coinDetails[0] = "Current value per coin: N/A (Error)";
      coinDetails[1] = vaultVerifiedText; 
    }

  return (
    <View style={commonStyles.safeArea}>
      <ScreenHeader title="WALLET" RightIconComponent={WalletIcon} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.profileInfoContainer}> 
          <View style={styles.walletBalanceRow}>
            <View style={styles.walletBalanceContainer}>
              <Text style={styles.walletBalanceLabel}>Wallet balance</Text>
              {isLoadingBalance ? (
                <Text style={styles.walletBalanceAmount}>Calculating...</Text>
              ) : balanceError ? (
                <Text style={[styles.walletBalanceAmount, styles.errorTextSmall]}>{balanceError}</Text>
              ) : nftCount > 0 && appSettings && typeof appSettings.gold_price_per_gram === 'number' ? (
                <Text style={styles.walletBalanceAmount}>
                  R {formatCurrency(totalValue)}
                </Text>
              ) : (
                <Text style={styles.walletBalanceAmount}>ZAR 0.00</Text>
              )}
              {settingsError && appSettings && (
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
       
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={() => navigation.navigate('Send')}>
            <Text style={styles.sendButtonText}>SEND</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.mainContentContainer}>
          <CoinCard
            title="Kingdom Coin 1 Oz fine gold" 
            displayMetricValue={totalOzOwned.toFixed(3)} 
            imageSrc={KingdomCoinImage} 
            details={coinDetails}
            onViewFullDetailsPress={() => handleViewCoinDetails("Kingdom Coin 1 Oz fine gold")} 
          />
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: spacing.xl + spacing.xl, 
  },
  centeredMessageContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.containerPadding,
  },
  loadingText: { 
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.m,
  },
  profileInfoContainer: { 
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.l,
    paddingBottom: spacing.s,
    alignItems: 'center', 
    backgroundColor: colors.surface, 
    borderRadius: borders.radiusMedium,
    marginHorizontal: spacing.containerPadding, 
    marginTop: spacing.l, 
  },
  walletBalanceRow: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
  mainContentContainer: {
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.m,
  },
  actionButtonContainer: {
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.m,
    marginTop: spacing.m, 
  },
  sendButton: {
    backgroundColor: '#1f2531', 
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center', 
  },
  sendButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  cardContainer: {
    backgroundColor: colors.surface, 
    borderRadius: borders.radiusMedium,
    padding: spacing.m,
    marginBottom: spacing.l,
  },
  cardHeader: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    marginBottom: spacing.s, 
  },
  cardTitle: {
    ...typography.h2, 
    fontSize: typography.headerTitle.fontSize, 
    color: colors.textPrimary,
  },
  cardQtyTag: {
    marginTop: spacing.xs, 
    ...typography.caption,
    color: colors.textSecondary,
    backgroundColor: colors.inputBackground, 
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: borders.radiusSmall,
  },
  coinImage: {
    width: '100%',
    height: 150, 
    borderRadius: borders.radiusSmall, 
    marginBottom: spacing.m,
    resizeMode: 'contain', 
  },
  expandCollapseButton: {
    paddingVertical: spacing.s,
    marginBottom: spacing.s,
    alignItems: 'flex-start', 
  },
  expandCollapseButtonText: {
    ...typography.link,
    color: colors.primary,
  },
  detailsContent: {
    // Add padding or margin if needed
  },
  detailsListContainer: {
    marginBottom: spacing.m,
  },
  detailItemText: {
    ...typography.body,
    color: colors.textSecondary, 
    fontSize: typography.label.fontSize, 
    marginBottom: spacing.s,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start', 
  },
  viewDetailsLink: {
    ...typography.link, 
    color: colors.primary, 
    textDecorationLine: 'underline',
  },
  refreshButton: { 
    padding: spacing.s,
  },
  errorTextSmall: { 
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
  },
  walletBalanceContainer: { 
    alignItems: 'flex-start',
  },
});

export default Wallet;
