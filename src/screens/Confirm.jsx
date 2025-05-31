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
      name: "Kingdom Coin #1",
      quantity: "1",
      value: "R 11 228.50"
    },
    {
      name: "Kingdom Coin #2",
      quantity: "1",
      value: "R 11 228.50"
    },
  ];

  const totalQuantity = coinsToConfirm.reduce((sum, coin) => sum + parseInt(coin.quantity, 10), 0).toString();
  const totalValue = coinsToConfirm.reduce((sum, coin) => {
    const numericValue = parseFloat(coin.value.replace("R ", "").replace(",", "."));
    return sum + numericValue;
  }, 0).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });

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
                <Text style={styles.coinNameText}>{coin.name}</Text>
                <Text style={styles.coinDetailText}>Qty: {coin.quantity}</Text>
                <Text style={styles.coinDetailText}>{coin.value}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabelText}>Total</Text>
              <Text style={styles.totalValueText}>QTY: {totalQuantity}</Text>
              <Text style={styles.totalValueText}>{totalValue}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
    borderBottomWidth: borders.borderWidth,
    borderBottomColor: colors.border,
  },
  coinNameText: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize - 1, // Slightly smaller
    fontWeight: '600',
    flex: 2,
  },
  coinDetailText: {
    color: colors.textSecondary,
    fontSize: typography.label.fontSize,
    flex: 1,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.m,
    marginTop: spacing.xs,
  },
  totalLabelText: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    flex: 2,
  },
  totalValueText: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  confirmButton: {
    backgroundColor: '#1f2531', // Match other primary action buttons
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    marginTop: spacing.m, // Reduced space above the button
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