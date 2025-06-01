import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import WalletIcon from '../assets/WalletIcon.jsx'; // Keep this if it's specific
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import new header
import BottomNavBar from '../components/BottomNavBar.jsx';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';

const Confirm = ({ navigation }) => {
  // Hardcoded data for display
  const accountName = "Andre Combrinck";
  const accountNumber = "112233445566";
  const [otp, setOtp] = useState('');

  const coinsToConfirm = [
    {
      name: "Kingdom Coin 1 Oz fine gold",
      quantity: "0.011", // Updated quantity value
      value: "R 119.22"
    },
  ];

  // Calculate the total quantity, now handling floating point numbers
  const numericTotalQuantity = coinsToConfirm.reduce((sum, coin) => {
    const quantityValue = parseFloat(coin.quantity); // Use parseFloat for decimal quantities
    return sum + (isNaN(quantityValue) ? 0 : quantityValue);
  }, 0);
  // Format total quantity, e.g., to 3 decimal places if inputs are like "0.011"
  const totalQuantity = numericTotalQuantity.toFixed(3);

  // Calculate the raw numeric total, correctly parsing values like "R 29 804.98"
  const rawNumericTotal = coinsToConfirm.reduce((sum, coin) => {
    // Sanitize the string: remove "R ", remove spaces (thousands separators), replace comma decimal with period
    const valueString = coin.value
      .replace("R ", "")      // Remove "R " prefix
      .replace(/\s/g, "")     // Remove all spaces (e.g., from "29 804.98" to "29804.98")
      .replace(",", ".");     // Convert comma decimal separator to period (if any)
    const numericValue = parseFloat(valueString);
    return sum + (isNaN(numericValue) ? 0 : numericValue); // Add 0 if parsing fails, otherwise add the number
  }, 0);

  // Custom function to format the currency as "R xxx xxx.xx"
  const formatCurrencyCustomSpaceSeparated = (value) => {
    const num = Number(value);
    const fixedNumStr = num.toFixed(2); // e.g., "29924.20"
    const parts = fixedNumStr.split('.');
    const integerPart = parts[0]; // e.g., "29924"
    const decimalPart = parts[1]; // e.g., "20"
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // e.g., "29 924"
    return `R ${formattedIntegerPart}.${decimalPart}`; // e.g., "R 29 924.20"
  };
  const totalValue = formatCurrencyCustomSpaceSeparated(rawNumericTotal);

  const handleConfirm = () => {
    // Logic for confirming the transaction
    console.log('Confirm button pressed');
    console.log('OTP:', otp);
    // Potentially navigate to a success screen or back to wallet
    navigation.navigate('Sent'); // Navigate to Sent screen
  };

  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="CONFIRM" RightIconComponent={WalletIcon} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Main Content Area */}
        <View style={styles.mainContentContainer}>
          <Text style={styles.infoHeading}>You are about to send the below coins to</Text>


          {/* Account Details Section */}
          <View style={styles.accountDetailSection}>
            <Text style={styles.detailLabel}>Account name</Text>
            <TextInput
              style={[styles.inputBox, styles.displayInputBox]}
              value={accountName}
              editable={false}
            />
          </View>

          <View style={styles.accountDetailSection}>
            <Text style={styles.detailLabel}>Account No</Text>
            <TextInput
              style={[styles.inputBox, styles.displayInputBox]}
              value={accountNumber}
              editable={false}
            />
          </View>

          {/* Email OTP Section */}
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
                <Text style={styles.totalCurrencyValueText}>{totalValue}</Text>
              </View>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>CONFIRM</Text>
          </TouchableOpacity>

          {/* Cancel Link */}
          <TouchableOpacity style={styles.cancelLinkContainer} onPress={() => navigation.navigate('Wallet')}>
            <Text style={styles.cancelLinkText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.containerPadding,
  },
  infoHeading: {
    ...typography.body,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.l,
  },
  accountDetailSection: {
    marginBottom: spacing.l,
  },
  otpSection: {
    marginBottom: spacing.l,
  },
  detailLabel: {
    ...typography.label,
    marginBottom: spacing.s,
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
    padding: spacing.m,
    marginBottom: spacing.xl,
    borderWidth: borders.borderWidth,
    borderColor: colors.border, // Use consistent border color
  },
  coinItemRow: {
    flexDirection: 'row',
    flexDirection: 'column', // Changed to arrange name above sub-details
    alignItems: 'flex-start', // Align items to the start of the column
    paddingVertical: spacing.s,
    borderBottomWidth: borders.borderWidth,
    borderBottomColor: colors.border,
  },
  coinNameTextLg: { // Renamed to avoid conflict if coinNameText is used elsewhere with different styles
    color: colors.textPrimary,
    fontSize: typography.body.fontSize - 1, // Slightly smaller
    fontWeight: '600',
    marginBottom: spacing.xs, // Add space between name and sub-details
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
    paddingTop: spacing.m,
    marginTop: spacing.xs,
  },
  totalLabelHeading: { // Renamed for clarity
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    marginBottom: spacing.xs, // Space between "Total" and the line below
    // flex: 2, // Removed as it's a heading now
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
    marginTop: 0, // Removed top margin for the tightest fit
  },
  confirmButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  cancelLinkContainer: {
    alignSelf: 'center',
    marginTop: spacing.m, // Reduced space above the link
    padding: spacing.s, // Add some padding for easier tapping
  },
  cancelLinkText: {
    ...typography.link, // Uses colors.primary by default from theme
    // color: colors.primary, // Explicitly ensuring it matches Login's "Forgot details" if needed
    textDecorationLine: 'underline',
  },
});

export default Confirm;