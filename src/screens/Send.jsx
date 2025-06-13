import React, { useState, useEffect, useCallback, useContext } from 'react'; // Import useContext
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'; // Added ActivityIndicator
import axios from 'axios';
import { JsonRpcProvider, Contract } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import assets and components
import WalletIcon from '../assets/WalletIcon.jsx';
import BottomNavBar from '../components/BottomNavBar.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import reusable header
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme'; // Import theme
import RefreshIcon from '../assets/RefreshIcon.jsx'; // Assuming you might want a refresh icon
import { AuthContext } from '../context/AuthContext.jsx'; // Import AuthContext
import { AppSettingsContext } from '../context/AppSettingsContext.jsx'; // Import AppSettingsContext

const LARAVEL_BACKEND_URL = "http://192.168.23.113";
const MIN_SEND_INCREMENT = 0.001; // Minimum 1/1000th of an Oz

const Send = ({ route, navigation }) => {
  const { user: senderUserFromContext, token, isLoading: isAuthLoading } = useContext(AuthContext);
  const { appSettings, isLoadingSettings, settingsError, fetchAppSettings: refreshAppSettings } = useContext(AppSettingsContext);

  const senderUser = senderUserFromContext || {}; // Fallback for initial load

  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [sendQuantityInOz, setSendQuantityInOz] = useState(MIN_SEND_INCREMENT); // Default to minimum sendable unit

  // Sender's wallet state
  const [senderTotalOz, setSenderTotalOz] = useState(0);
  const [senderTotalValueInZAR, setSenderTotalValueInZAR] = useState(0);

  // Loading and error states for wallet data
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [balanceError, setBalanceError] = useState('');

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');

  // New states for recipient verification
  const [isVerifyingRecipient, setIsVerifyingRecipient] = useState(false);
  const [verifiedRecipientDetails, setVerifiedRecipientDetails] = useState(null);
  const [recipientVerificationError, setRecipientVerificationError] = useState('');

  const erc1155Abi = [
    "function balanceOf(address account, uint256 id) external view returns (uint256)"
  ];

  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '0.00';
    const parts = value.toFixed(2).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  const valueToSendInZAR = appSettings?.gold_price_per_gram
    ? sendQuantityInOz * appSettings.gold_price_per_gram
    : 0;

  // --- Fetch Sender's Wallet Data (Similar to Wallet.jsx) ---
  const fetchSenderWalletData = useCallback(async () => {
    console.log("Send.jsx: fetchSenderWalletData called.");
    if (!senderUser.blockchain_wallet_address) {
      console.log("Send.jsx: fetchSenderWalletData - No blockchain_wallet_address. Setting balanceError.");
      setBalanceError("User blockchain address not available.");
      setIsLoadingBalance(false);
      return;
    }
    if (!appSettings || !appSettings.alchemy_rpc_url || typeof appSettings.gold_price_per_gram !== 'number') {
      console.log("Send.jsx: fetchSenderWalletData - App settings missing or invalid. Current appSettings:", appSettings);
      if (!isLoadingSettings) {
        setBalanceError("App settings missing or invalid for balance.");
      }
      setIsLoadingBalance(false);
      return;
    }

    console.log("Send.jsx: fetchSenderWalletData - Proceeding to fetch balance. Setting isLoadingBalance to true.");
    setIsLoadingBalance(true);
    setBalanceError('');

    try {
      const provider = new JsonRpcProvider(appSettings.alchemy_rpc_url);
      const trackedNftsResponse = await axios.get(`${LARAVEL_BACKEND_URL}/api/assets/tracked-nft-details`);
      const trackedNfts = trackedNftsResponse.data;

      if (!Array.isArray(trackedNfts) || trackedNfts.length === 0) {
        console.log("Send.jsx: fetchSenderWalletData - No tracked NFTs found.");
        // setSenderNftCount(0); // Not needed if we directly use senderTotalOz
        setSenderTotalOz(0);
        setSenderTotalValueInZAR(0);
        return;
      }

      let currentNftCount = 0;
      for (const nft of trackedNfts) {
        if (nft.blockchain_address && nft.token_id !== null && nft.token_id !== undefined) {
          const contract = new Contract(nft.blockchain_address, erc1155Abi, provider);
          const balance = await contract.balanceOf(senderUser.blockchain_wallet_address, nft.token_id);
          currentNftCount += Number(balance);
        }
      }
      // setSenderNftCount(currentNftCount); // Not needed
      const ozOwned = currentNftCount / 1000;
      setSenderTotalOz(ozOwned);

      if (currentNftCount > 0 && typeof appSettings.gold_price_per_gram === 'number') {
        setSenderTotalValueInZAR(ozOwned * appSettings.gold_price_per_gram);
      } else {
        setSenderTotalValueInZAR(0);
      }
      console.log(`Send.jsx: fetchSenderWalletData - Success. Oz: ${ozOwned}, Value: ${senderTotalValueInZAR}`);
    } catch (error) {
      console.error("Send.jsx: Error in fetchSenderWalletData:", error.message);
      setBalanceError("Could not load sender wallet data.");
    } finally {
      console.log("Send.jsx: fetchSenderWalletData - Finally block. Setting isLoadingBalance to false.");
      setIsLoadingBalance(false);
    }
  }, [senderUser.blockchain_wallet_address, appSettings, isLoadingSettings]);

  useEffect(() => {
    if (senderUser.blockchain_wallet_address && appSettings && !isLoadingSettings && !settingsError && !isAuthLoading) {
      console.log("Send.jsx: WalletData useEffect - Conditions met, calling fetchSenderWalletData.");
      fetchSenderWalletData();
    } else if (!isLoadingSettings && (!appSettings || settingsError)) {
      console.log("Send.jsx: WalletData useEffect - Settings load done but settings are bad or error. Setting isLoadingBalance to false.");
      setIsLoadingBalance(false);
      if (!settingsError && !appSettings) {
        setBalanceError("App settings unavailable for balance calculation.");
      }
    } else if (isAuthLoading || isLoadingSettings) {
        setIsLoadingBalance(true);
    }
  }, [senderUser.blockchain_wallet_address, appSettings, isLoadingSettings, settingsError, isAuthLoading, fetchSenderWalletData]);

  const handleQuantityChange = (increment) => {
    setSendQuantityInOz(prev => {
      let newValue = parseFloat((prev + increment * MIN_SEND_INCREMENT).toFixed(3));
      if (newValue < MIN_SEND_INCREMENT) newValue = MIN_SEND_INCREMENT;
      if (newValue > senderTotalOz) newValue = senderTotalOz; // Cap at sender's total Oz
      return newValue;
    });
  };

  const coinName = "Kingdom Coin 1 Oz fine gold"; // Assuming single asset type for now

   const handleProceedToConfirm = async () => {
    if (!recipientAccountNumber.trim()) {
      setRecipientVerificationError("Recipient account number is required.");
      return;
    }

    setIsVerifyingRecipient(true);
    setVerifiedRecipientDetails(null);
    setRecipientVerificationError('');
    setOtpError(''); // Clear previous OTP error

    try {
      // Token is now from AuthContext
      if (!token || !senderUser) {
        setRecipientVerificationError("Authentication error. Please login again.");
        setIsVerifyingRecipient(false);
        return;
      }

      // 1. Verify Recipient Account Number
      console.log("Send.jsx: Verifying recipient account:", recipientAccountNumber);
      const recipientResponse = await axios.post(`${LARAVEL_BACKEND_URL}/api/user/lookup-by-account-number`, {
        account_number: recipientAccountNumber,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (recipientResponse.data && recipientResponse.data.blockchain_wallet_address) {
        console.log("Send.jsx: Recipient verified:", recipientResponse.data);
        setVerifiedRecipientDetails(recipientResponse.data); // Store recipient details
        setIsVerifyingRecipient(false);

        // 2. Proceed to Initiate OTP
        setIsSendingOtp(true);
        await axios.post(`${LARAVEL_BACKEND_URL}/api/transaction/initiate-send`,
          {}, // No body needed for this request as user is identified by token
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        console.log("Send.jsx: OTP initiated successfully.");

        // If successful, navigate to Confirm screen
        navigation.navigate('Confirm', {
          recipientAccountNumber: recipientAccountNumber, // Still pass this for display
          verifiedRecipientDetails: recipientResponse.data, // Pass the verified details
          sendQuantityInOz: sendQuantityInOz,
          valueToSendInZAR: valueToSendInZAR,
          coinName: coinName,
          // No longer need to pass senderUser and appSettings if Confirm.jsx uses context
        });

      } else {
        throw new Error(recipientResponse.data?.message || "Invalid recipient account or details not found.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
      // If OTP sending was initiated, it's an OTP error. Otherwise, it's a verification error.
      if (isSendingOtp) {
        console.error("Send.jsx: Error sending OTP:", errorMessage);
        setOtpError(errorMessage);
      } else {
        console.error("Send.jsx: Error verifying recipient:", errorMessage);
        setRecipientVerificationError(errorMessage);
      }
    } finally {
      setIsVerifyingRecipient(false);
      setIsSendingOtp(false);
    }
  };

  // Loading state for the entire screen until contexts are ready
  if (isAuthLoading || (isLoadingSettings && !appSettings)) {
    return (
      <View style={commonStyles.safeArea}>
        <ScreenHeader title="SEND" RightIconComponent={WalletIcon} />
        <View style={commonStyles.centeredMessageContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={commonStyles.loadingText}>Loading Send Screen...</Text>
        </View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }

  if ((settingsError && !appSettings) || (!senderUser.id && !isAuthLoading)) {
    return (
      <View style={commonStyles.safeArea}>
        <ScreenHeader title="SEND" RightIconComponent={WalletIcon} />
        <View style={commonStyles.centeredMessageContainer}><Text style={commonStyles.errorTextLarge}>{settingsError || "User data not available."}</Text></View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }
  return (
    <View style={commonStyles.safeArea}>
      <ScreenHeader title="SEND" RightIconComponent={WalletIcon} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>

        {/* Main Content Area */}
        <View style={styles.mainContentContainer}>
          {/* Send to Account number Section */}
          <View style={styles.sendToAccountSection}>
            <Text style={styles.sendToAccountTitle}>Send to Account number</Text>
            <TextInput
              style={styles.accountNumberInput}
              placeholder="Enter receiving account number here"
              placeholderTextColor={colors.textPlaceholder}
              keyboardType="default" // Account numbers might be alphanumeric
              value={recipientAccountNumber}
              onChangeText={(text) => {
                setRecipientAccountNumber(text);
                setRecipientVerificationError(''); // Clear verification error on input change
                setOtpError(''); // Also clear OTP error
              }}
            />
          </View>

          {/* Per-Coin Sections */}
            <View style={styles.coinSection}>
              <Text style={styles.coinSectionHeader}>{coinName}</Text>
              <View style={styles.coinDetailsContainer}>
                {/* Wallet Info Part for this coin */}
                <View style={styles.coinInfoColumn}>
                  <Text style={styles.columnSubHeader}>Wallet</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Oz:</Text>
                    <Text style={styles.detailValue}>{isLoadingBalance ? "Loading..." : senderTotalOz.toFixed(3)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Value:</Text>
                    <Text style={styles.detailValue}>{isLoadingBalance ? "Loading..." : `R ${formatCurrency(senderTotalValueInZAR)}`}</Text>
                  </View>
                </View>

                {/* Send Info Part for this coin */}
                <View style={styles.coinInfoColumn}>
                  <Text style={styles.columnSubHeader}>Send</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Oz:</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(-1)} disabled={isLoadingBalance || sendQuantityInOz <= MIN_SEND_INCREMENT}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityValueText}>{sendQuantityInOz.toFixed(3)}</Text>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(1)} disabled={isLoadingBalance || sendQuantityInOz >= senderTotalOz}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Value:</Text>
                    <Text style={styles.detailValue}>{`R ${formatCurrency(valueToSendInZAR)}`}</Text>
                  </View>
                </View>
              </View>
              {balanceError && (
                <Text style={[commonStyles.errorText, styles.balanceErrorText]}>{balanceError}</Text>
              )}
              {settingsError && !balanceError && appSettings && ( // Show app settings error if no specific balance error but settings exist
                <Text style={[commonStyles.errorText, styles.balanceErrorText]}>{settingsError}</Text>
              )}
            </View>

          {/* Send Button */}
          <TouchableOpacity
            style={[
              styles.sendActionButton,
              styles.mainSendButton,
              (isLoadingBalance || isVerifyingRecipient || isSendingOtp || !!balanceError || !!settingsError || !!recipientVerificationError) && commonStyles.buttonDisabled
            ]}
            disabled={isLoadingBalance || isVerifyingRecipient || isSendingOtp || !!balanceError || !!settingsError || !!recipientVerificationError}
            onPress={handleProceedToConfirm}
          >
            <Text style={styles.sendActionButtonText}>
              {isVerifyingRecipient ? 'VERIFYING RECIPIENT...' : isSendingOtp ? 'INITIALIZING OTP...' : 'SEND'}
            </Text>
          </TouchableOpacity>
          {recipientVerificationError && !otpError ? <Text style={[commonStyles.errorText, styles.otpErrorText]}>{recipientVerificationError}</Text> : null}
          {otpError ? <Text style={[commonStyles.errorText, styles.otpErrorText]}>{otpError}</Text> : null}


          {/* Back to Wallet Button */}
          <TouchableOpacity style={[styles.sendActionButton, styles.backLinkButtonSpecifics]} onPress={() => navigation.navigate('Wallet')}>
            {/* Text style can remain sendActionButtonText if colors.primaryButtonText is white and suitable */}
            {/* If sendActionButtonText is dark, you might need a new style or inline style for white text */}
            <Text style={styles.sendActionButtonText}>BACK</Text> 
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  // safeArea is now commonStyles.safeArea
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: spacing.xl + spacing.xl, // Ensure space for BottomNavBar
  },
  mainContentContainer: {
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.l,
  },
  sendToAccountSection: {
    alignItems: 'center', // Centers the title "Send to Account number"
    marginBottom: spacing.xl,
  },
  sendToAccountTitle: {
    ...typography.h2,
    fontSize: typography.headerTitle.fontSize, // Match header title size
    color: colors.textPrimary,
    marginBottom: spacing.m,
  },
  accountNumberInput: {
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    paddingHorizontal: spacing.inputPaddingHorizontal,
    paddingVertical: spacing.inputPaddingVertical,
    borderRadius: borders.radiusMedium,
    width: '100%', // Full width within padded container
    fontSize: typography.body.fontSize,
    textAlign: 'left', // Standard for input fields
    borderWidth: borders.borderWidth,
    borderColor: colors.inputBorder,
  },
  // Styles for Per-Coin Sections
  coinSection: {
    marginBottom: spacing.xl,
    padding: spacing.m,
    borderWidth: borders.borderWidth,
    borderColor: colors.border,
    borderRadius: borders.radiusMedium,
    backgroundColor: colors.surface,
  },
  coinSectionHeader: {
    ...typography.h2,
    fontSize: typography.headerTitle.fontSize - 2, // Slightly smaller than main headers
    color: colors.textPrimary,
    marginBottom: spacing.m,
    paddingBottom: spacing.s,
    borderBottomWidth: borders.borderWidth,
    borderBottomColor: colors.border,
    textAlign: 'center',
  },
  coinDetailsContainer: {
    flexDirection: 'column', // Stack Wallet and Send info vertically
    marginTop: spacing.m,
  },
  coinInfoColumn: {
    // flex: 1, // No longer need flex: 1 when stacking
    marginBottom: spacing.l, // Add margin between stacked Wallet and Send sections
    paddingHorizontal: spacing.xs, // Keep horizontal padding
  },
  columnSubHeader: {
    ...typography.label,
    color: colors.textSecondary,
    fontSize: typography.label.fontSize + 1, // Slightly larger label
    marginBottom: spacing.s, // Reduced bottom margin
    textAlign: 'left', // Align to the left for a more standard section header feel
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    width: 50, // Adjusted width for "Oz:" and "Value:"
  },
  detailValue: {
    flex: 1, // Ensure it takes available space to align with quantityControls
    ...typography.caption,
    color: colors.textPrimary,
    textAlign: 'right',
    height: 30, // Match the height of the quantityButton
    lineHeight: 30,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to the right of the "Qty:" label
    // flex: 1, // Removed to let text input dictate size more naturally
  },
  quantityButton: {
    width: 30, // Standardized size
    height: 30,
    borderRadius: borders.radiusMedium, // Consistent radius
    borderWidth: borders.borderWidth,
    borderColor: colors.primary, // Use theme primary for outline
    justifyContent: 'center',
    alignItems: 'center', // Keep marginHorizontal as spacing.xs
    marginHorizontal: spacing.xs, // e.g., 4px
    backgroundColor: colors.inputBackground, // Subtle background
  },
  quantityButtonText: {
    color: colors.primary, // Use theme primary for text
    fontSize: typography.h2.fontSize, // Larger, clearer text
    fontWeight: 'bold',
    lineHeight: typography.h2.fontSize + 2, // Adjust for vertical centering
  },
  quantityValueText: {
    ...typography.caption, // Changed from typography.body to match detailValue
    color: colors.textPrimary,
    minWidth: 45, // Slightly reduced minWidth
    textAlign: 'center',
    marginHorizontal: spacing.xs, // Reduced margin to match buttons
  },
  totalRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  totalLabel: {
    ...typography.label,
    color: colors.textSecondary,
    fontWeight: typography.button.fontWeight, // Match button weight
  },
  totalValueText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: typography.button.fontWeight, // Match button weight
    textAlign: 'right',
  },
  sendActionButton: {
    backgroundColor: '#1f2531', // Match Wallet.jsx SEND button color
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l, // Add horizontal padding for consistency
    borderRadius: borders.radiusMedium,
    alignItems: 'center', // Center text inside button
    justifyContent: 'center', // Ensure text is centered vertically
    minHeight: 50, // Ensure a good tap target height
  },
  sendActionButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  mainSendButton: { // Specific style for the primary SEND button
    marginTop: spacing.xxs, // Significantly reduced space above the main SEND button
  },
  backLinkButtonSpecifics: { // Specific styles for the "Back to Wallet" button
    marginTop: spacing.m, // Space above this button
    backgroundColor: colors.surface, // Changed to lighter background
    borderColor: '#1f2531',         // Border color matching the SEND button's background
    borderWidth: borders.borderWidth,
  },
  balanceErrorText: { // Specific style for balance errors within the card
    marginTop: spacing.m,
    textAlign: 'center',
    fontSize: typography.caption.fontSize,
    },
  otpErrorText: { // Style for OTP initiation errors
    marginTop: spacing.m,
    textAlign: 'center',
  },
});

export default Send;
