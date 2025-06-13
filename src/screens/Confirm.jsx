import React, { useState, useEffect, useCallback, useContext } from 'react'; // Import useContext
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'; // Added ActivityIndicator
import axios from 'axios';

// import AsyncStorage from '@react-native-async-storage/async-storage'; // Token will come from context
// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import WalletIcon from '../assets/WalletIcon.jsx'; // Keep this if it's specific
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import new header
import BottomNavBar from '../components/BottomNavBar.jsx';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';
import { AuthContext } from '../context/AuthContext.jsx'; // Import AuthContext
import { AppSettingsContext } from '../context/AppSettingsContext.jsx'; // Import AppSettingsContext

const LARAVEL_BACKEND_URL = "http://192.168.23.113"; // Ensure this is correct

const Confirm = ({ route, navigation }) => {
  // Destructure data passed from Send.jsx
  const {
    recipientAccountNumber,
    verifiedRecipientDetails: passedVerifiedRecipientDetails, // Renamed for clarity
    sendQuantityInOz,
    valueToSendInZAR,
    coinName
    // senderUser and appSettings will come from context
  } = route.params || {};

  const { user: senderUser, token, isLoading: isAuthLoading } = useContext(AuthContext);
  const { appSettings, isLoadingSettings, settingsError } = useContext(AppSettingsContext);

  const [verifiedRecipientDetails, setVerifiedRecipientDetails] = useState(passedVerifiedRecipientDetails || null);
  // Only verify if not passed AND recipientAccountNumber is present
  const [isVerifying, setIsVerifying] = useState(!passedVerifiedRecipientDetails && !!recipientAccountNumber);
  const [verificationError, setVerificationError] = useState(
    passedVerifiedRecipientDetails ? '' : (recipientAccountNumber ? '' : 'Recipient details not provided.')
  );


  const displayRecipientName = isVerifying && !passedVerifiedRecipientDetails
    ? "Verifying..."
    : verifiedRecipientDetails?.account_name || (verificationError && !passedVerifiedRecipientDetails ? "Invalid Account" : "N/A");
  const displayRecipientAccountNumber = recipientAccountNumber || "N/A";

  const [otp, setOtp] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState('');




  // Custom function to format the currency as "R xxx xxx.xx"
  // Moved definition before usage
  const formatCurrencyCustomSpaceSeparated = (value) => {
    const num = Number(value);
    if (isNaN(num)) { // Handle cases where value might not be a number
      return "R 0.00";
    }
    const fixedNumStr = num.toFixed(2); // e.g., "29924.20"
    const parts = fixedNumStr.split('.');
    const integerPart = parts[0]; // e.g., "29924"
    const decimalPart = parts[1]; // e.g., "20"
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // e.g., "29 924"
    return `R ${formattedIntegerPart}.${decimalPart}`; // e.g., "R 29 924.20"
  };
  // Construct coinsToConfirm dynamically
  const coinsToConfirm = [
    {
      name: coinName || "N/A",
      quantity: (typeof sendQuantityInOz === 'number' ? sendQuantityInOz.toFixed(3) : "0.000"),
      value: typeof valueToSendInZAR === 'number' ? formatCurrencyCustomSpaceSeparated(valueToSendInZAR) : "R 0.00"
    },
  ];

  // Totals are now directly from passed props
  const totalQuantity = typeof sendQuantityInOz === 'number' ? sendQuantityInOz.toFixed(3) : "0.000";
  const totalValueDisplay = typeof valueToSendInZAR === 'number' ? formatCurrencyCustomSpaceSeparated(valueToSendInZAR) : "R 0.00";

  // --- Verify Recipient Account Number (Fallback) ---
  const verifyRecipient = useCallback(async () => {
    // Only run if details were not passed AND recipientAccountNumber is present
    if (passedVerifiedRecipientDetails || !recipientAccountNumber) {
      setIsVerifying(false); // Ensure loading state is off if we skip verification
      if (!passedVerifiedRecipientDetails && recipientAccountNumber) {
        // This case implies Send.jsx failed to pass details, but we have an account number
        // It might be an edge case or an error in the flow from Send.jsx
        console.warn("Confirm.jsx: Recipient details not passed, but account number is present. Attempting fallback verification.");
      } else if (!recipientAccountNumber) {
        setVerificationError("Recipient account number is missing.");
        return;
      } else { // Details were passed, no need to verify
        return;
      }
    }

    // If we reach here, it means passedVerifiedRecipientDetails is null, but recipientAccountNumber is present.
    console.log("Confirm.jsx: Fallback - Verifying recipient account:", recipientAccountNumber);
    setIsVerifying(true);
    setVerificationError('');
    // setVerifiedRecipientDetails(null); // Don't clear if we are just re-verifying or in fallback

    try {
      // Use token from AuthContext
      if (!token || !senderUser) {
        throw new Error("Authentication token not found.");
      }

      const response = await axios.post(`${LARAVEL_BACKEND_URL}/api/user/lookup-by-account-number`, {
        account_number: recipientAccountNumber,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data && response.data.blockchain_wallet_address) {
        setVerifiedRecipientDetails(response.data);
      } else {
        throw new Error(response.data?.message || "Invalid response from recipient lookup.");
      }
    } catch (error) {
      console.error("Confirm.jsx: Error verifying recipient (fallback):", error.response ? error.response.data : error.message);
      setVerificationError(error.response?.data?.message || "Invalid Account");
      setVerifiedRecipientDetails(null); // Clear details on error
    } finally {
      setIsVerifying(false);
    }
  }, [recipientAccountNumber, passedVerifiedRecipientDetails, token, senderUser]); // Added token and senderUser

  useEffect(() => {
    // Only trigger verification if details were NOT passed from Send.jsx AND an account number exists
    if (!passedVerifiedRecipientDetails && recipientAccountNumber) {
      verifyRecipient();
    }
  }, [verifyRecipient, passedVerifiedRecipientDetails, recipientAccountNumber]);


  const handleConfirm = async () => {
    if (!otp.trim() || otp.length !== 4) {
      setConfirmError("Please enter a valid 4-digit OTP.");
      return;
    }
    if (!verifiedRecipientDetails?.account_number) {
        setConfirmError("Recipient details are not verified.");
        return;
    }
    if (typeof sendQuantityInOz !== 'number' || sendQuantityInOz <= 0) {
        setConfirmError("Invalid send quantity.");
        return;
    }

    setIsConfirming(true);
    setConfirmError('');

    try {
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const payload = {
        otp: otp,
        amount: sendQuantityInOz, // The backend expects 'amount'
        recipient_account_number: verifiedRecipientDetails.account_number,
        // The backend will look up the recipient's wallet address.
        // We don't need to send contract_address or token_id for this simplified version,
        // as the backend currently simulates the transaction.
        // If the backend were to interact with a specific contract/token,
        // we would get those from appSettings and include them here.
      };

      console.log("Confirm.jsx: Calling /api/transaction/execute-send with payload:", payload);
      const response = await axios.post(`${LARAVEL_BACKEND_URL}/api/transaction/execute-send`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log("Confirm.jsx: Transaction execution response:", response.data);
      navigation.navigate('Sent', { transactionDetails: { ...payload, message: response.data.message } }); // Pass some details to Sent screen

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Transaction failed. Please try again.";
      console.error("Confirm.jsx: Error executing transaction:", errorMessage, error.response?.data);
      setConfirmError(errorMessage);
    } finally {
      setIsConfirming(false);
    }
  };

  // Loading state for the entire screen until contexts are ready
  if (isAuthLoading || (isLoadingSettings && !appSettings)) {
    return (
      <View style={styles.safeArea}>
        <ScreenHeader title="CONFIRM" RightIconComponent={WalletIcon} />
        <View style={commonStyles.centeredMessageContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={commonStyles.loadingText}>Loading Confirmation...</Text>
        </View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }

  if ((settingsError && !appSettings) || (!senderUser?.id && !isAuthLoading)) {
    return (
      <View style={styles.safeArea}>
        <ScreenHeader title="CONFIRM" RightIconComponent={WalletIcon} />
        <View style={commonStyles.centeredMessageContainer}><Text style={commonStyles.errorTextLarge}>{settingsError || "User data not available."}</Text></View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }
  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="CONFIRM" RightIconComponent={WalletIcon} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Main Content Area */}
        <View style={styles.mainContentContainer}> 

          {/* Recipient Details Section */}
          <Text style={[styles.sectionTitle, styles.firstSectionTitle]}>SEND TO</Text>
          <View style={styles.accountDetailSection}>
            <Text style={styles.detailLabel}>Account name</Text>
            <TextInput
              style={[styles.inputBox, styles.displayInputBox]}
              value={displayRecipientName}
              editable={false}
            />
          </View>
          <View style={styles.accountDetailSection}>
            <Text style={styles.detailLabel}>Account No</Text>
            <TextInput
              style={[styles.inputBox, styles.displayInputBox]}
              value={displayRecipientAccountNumber}
              editable={false}
            />
          </View>
          {verificationError && !passedVerifiedRecipientDetails && ( // Show error only if verification was attempted here and failed
            <Text style={[commonStyles.errorText, {textAlign: 'center', marginBottom: spacing.m}]}>{verificationError}</Text>
          )}


          {/* Email OTP Section */}
          <Text style={styles.sectionTitle}>SECURITY</Text>
          <View style={styles.otpSection}>
            <Text style={styles.detailLabel}>Email OTP</Text>
            <TextInput
              style={[styles.inputBox, styles.otpInputBox]}
              placeholder="Input OTP here"
              placeholderTextColor={colors.textPlaceholder}
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
              secureTextEntry // Optional: if OTP should be masked
            />
          </View>

          {/* Coin Details Card Section */}
          <Text style={styles.sectionTitle}>AMOUNT</Text>
          <View style={styles.coinCardSection}>
            {coinsToConfirm.map((coin, index) => (
              <View key={`confirm-coin-${index}`} style={styles.coinItemRow}>
                <Text style={styles.coinNameTextLg}>{coin.name}</Text>
                <View style={styles.coinSubDetailsRow}>
                  <Text style={styles.coinQuantityText}>Oz: {coin.quantity}</Text>
                  <Text style={styles.coinValueText}>{coin.value}</Text>
                </View>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabelHeading}>Total</Text>
              <View style={styles.totalSubDetailsRow}>
                <Text style={styles.totalQuantityText}>Oz: {totalQuantity}</Text>
                <Text style={styles.totalCurrencyValueText}>{totalValueDisplay}</Text>
              </View>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              (isConfirming || isVerifying || !!verificationError || !verifiedRecipientDetails || !otp.trim() || otp.length !== 4) && commonStyles.buttonDisabled
            ]}
            onPress={handleConfirm}
            disabled={isConfirming || isVerifying || !!verificationError || !verifiedRecipientDetails || !otp.trim() || otp.length !== 4}
          >
            <Text style={styles.confirmButtonText}>
              {isConfirming ? 'CONFIRMING...' : 'CONFIRM'}
            </Text>
          </TouchableOpacity>
          {confirmError ? <Text style={[commonStyles.errorText, {textAlign: 'center', marginTop: spacing.m}]}>{confirmError}</Text> : null}


          {/* Cancel Button */}
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Wallet')}>
            <Text style={styles.confirmButtonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* BottomNavBar now gets user and appSettings from context */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { ...commonStyles.safeArea },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 100,
  },
  mainContentContainer: {
    paddingHorizontal: spacing.containerPadding, // Keep horizontal padding
    paddingVertical: spacing.m, // Reduced vertical padding
  },
  infoHeading: {
    ...typography.body,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.m, // Increased slightly
  },
  sectionTitle: {
    ...typography.h3, // Or a new style for section titles
    color: colors.textSecondary,
    marginTop: spacing.s,    // Further reduced marginTop
    marginBottom: spacing.s, // Increased
  },
  firstSectionTitle: { // Added to specifically target the first title
    marginTop: spacing.s, // Further reduced top margin
  },
  accountDetailSection: {
    marginBottom: spacing.m, // Increased
  },
  otpSection: {
    marginBottom: spacing.m, // Increased
  },
  detailLabel: {
    ...typography.label,
    marginBottom: spacing.xs, // Increased
  },
  inputBox: { 
    paddingHorizontal: spacing.inputPaddingHorizontal,
    paddingVertical: spacing.inputPaddingVertical,
    borderRadius: borders.radiusMedium,
    fontSize: typography.body.fontSize,
    borderWidth: borders.borderWidth,
  },
  displayInputBox: {
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    borderColor: colors.inputBorder,
  },
  otpInputBox: {
    backgroundColor: colors.inputBackground, // Changed from white to dark
    color: colors.inputText,         // Changed from black to white
    borderColor: colors.primary, // Highlight OTP input with primary color or keep inputBorder
  },
  coinCardSection: {
    backgroundColor: colors.surface,
    borderRadius: borders.radiusMedium,
    padding: spacing.s,      // Reduced padding inside card
    marginBottom: spacing.l, // Increased margin below card
    borderWidth: borders.borderWidth,
    borderColor: colors.border, // Use consistent border color
  },
  coinItemRow: {
    flexDirection: 'row',
    flexDirection: 'column', // Changed to arrange name above sub-details
    alignItems: 'flex-start', // Align items to the start of the column
    paddingVertical: spacing.xs, // Reduced
    borderBottomWidth: borders.borderWidth,
    borderBottomColor: colors.border,
  },
  coinNameTextLg: { // Renamed to avoid conflict if coinNameText is used elsewhere with different styles
    color: colors.textPrimary,
    fontSize: typography.body.fontSize - 1, // Slightly smaller
    fontWeight: '600',
    marginBottom: spacing.xxs, // Reduced
    // flex: 2, // Removed as it's not needed in column layout
  },
  coinSubDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure it spans the full width
  },
  coinQuantityText: { // Style for "Qty: ..."
    color: colors.textSecondary,
    fontSize: typography.label.fontSize,
    textAlign: 'left', // Align quantity to the left
  },
  coinValueText: { // Style for the currency value
    color: colors.textSecondary,
    fontSize: typography.label.fontSize,
    textAlign: 'right',
    // flex: 1, // Retain flex if you want value to push to the right, works with justifyContent: 'space-between'
  },
  totalRow: {
    flexDirection: 'row',
    flexDirection: 'column', // Changed to stack heading above sub-details
    alignItems: 'flex-start', // Align items to the start
    paddingTop: spacing.s,   // Reduced
    marginTop: spacing.xxs,  // Reduced
  },
  totalLabelHeading: { // Renamed for clarity
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    marginBottom: spacing.xxs, // Reduced
  },
  totalSubDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure it spans the full width
  },
  totalQuantityText: { // Style for "QTY: ..." in the total section
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    textAlign: 'left', // Align quantity to the left
    // flex: 1, // Adjust flex as needed, or remove if space-between on parent is enough
  },
  totalCurrencyValueText: { // Style for the currency value in the total section
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    textAlign: 'right',
    // flex: 1, // Adjust flex as needed
  },
  confirmButton: {
    backgroundColor: '#1f2531', // Match other primary action buttons
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    marginTop: spacing.xs, // Reduced margin above CONFIRM button
  },
  confirmButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  cancelButton: { // Style for the new CANCEL button
    backgroundColor: colors.surface, // A different background to distinguish from confirm
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    marginTop: spacing.l, // Increased space above the cancel button
    borderWidth: borders.borderWidth,
    borderColor: '#1f2531', // Border color matching confirm button's background
  },
});

export default Confirm;
