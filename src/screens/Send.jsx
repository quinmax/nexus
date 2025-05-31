import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

// Import assets and components
import WalletIcon from '../assets/WalletIcon.jsx';
import BottomNavBar from '../components/BottomNavBar.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import reusable header
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme'; // Import theme

const Send = ({ navigation }) => {
  // Hardcoded data as per requirements
  const coins = [
    {
      name: "Kingdom Coin #1",
      walletQuantity: "2",
      walletValue: "R 22 457,75",
      sendQuantitySelected: "0",
      sendValueSelected: "R 0.00"
    },
    {
      name: "Kingdom Coin #2",
      walletQuantity: "2",
      walletValue: "R 22 457,75",
      sendQuantitySelected: "0",
      sendValueSelected: "R 0.00"
    },
  ];
  const totalQTY = "0";
  const totalSend = "R 0,00"; // Hardcoded as per reference

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
              keyboardType="numeric" // Assuming account numbers are numeric
            />
          </View>

          {/* Per-Coin Sections */}
          {coins.map((coin, index) => (
            <View key={`coin-section-${index}`} style={styles.coinSection}>
              <Text style={styles.coinSectionHeader}>{coin.name}</Text>
              <View style={styles.coinDetailsContainer}>
                {/* Wallet Info Part for this coin */}
                <View style={styles.coinInfoColumn}>
                  <Text style={styles.columnSubHeader}>Wallet</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Qty:</Text>
                    <Text style={styles.detailValue}>{coin.walletQuantity}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Value:</Text>
                    <Text style={styles.detailValue}>{coin.walletValue}</Text>
                  </View>
                </View>

                {/* Send Info Part for this coin */}
                <View style={styles.coinInfoColumn}>
                  <Text style={styles.columnSubHeader}>Send</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Qty:</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => console.log('Decrement quantity for ' + coin.name)}>
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityValueText}>{coin.sendQuantitySelected}</Text>
                      <TouchableOpacity style={styles.quantityButton} onPress={() => console.log('Increment quantity for ' + coin.name)}>
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Value:</Text>
                    <Text style={styles.detailValue}>{coin.sendValueSelected}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* Totals Section */}
          <View style={styles.totalsSection}>
            <View style={styles.totalRowItem}>
              <Text style={styles.totalLabel}>Total Send Quantity:</Text>
              <Text style={styles.totalValueText}>{totalQTY}</Text>
            </View>
            <View style={styles.totalRowItem}>
              <Text style={styles.totalLabel}>Total Send Value:</Text>
              <Text style={styles.totalValueText}>{totalSend}</Text>
            </View>
          </View>

          {/* Send Button */}
          <TouchableOpacity style={styles.sendActionButton} onPress={() => navigation.navigate('Confirm')}>
            <Text style={styles.sendActionButtonText}>SEND</Text>
          </TouchableOpacity>

          {/* Back to Wallet Link */}
          <TouchableOpacity style={styles.backLinkContainer} onPress={() => navigation.navigate('Wallet')}>
            <Text style={styles.backLinkText}>Back to Wallet</Text>
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
    flexDirection: 'row', // Wallet and Send info side-by-side
    justifyContent: 'space-between',
    marginTop: spacing.m,
  },
  coinInfoColumn: {
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  columnSubHeader: {
    ...typography.label,
    color: colors.textSecondary,
    fontSize: typography.label.fontSize + 1, // Slightly larger label
    marginBottom: spacing.m,
    textAlign: 'center',
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
    width: 60, // Adjusted width
  },
  detailValue: {
    flex: 1, // Ensure it takes available space to align with quantityControls
    ...typography.caption,
    color: colors.textPrimary,
    textAlign: 'right',
    paddingRight: spacing.xs,
    height: 30, // Match the height of the quantityButton
    lineHeight: 30,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to the right of the "Qty:" label
    flex: 1, // Allow it to take remaining space in detailRow if needed
  },
  quantityButton: {
    width: 30, // Standardized size
    height: 30,
    borderRadius: borders.radiusMedium, // Consistent radius
    borderWidth: borders.borderWidth,
    borderColor: colors.primary, // Use theme primary for outline
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    backgroundColor: colors.inputBackground, // Subtle background
  },
  quantityButtonText: {
    color: colors.primary, // Use theme primary for text
    fontSize: typography.h2.fontSize, // Larger, clearer text
    fontWeight: 'bold',
    lineHeight: typography.h2.fontSize + 2, // Adjust for vertical centering
  },
  quantityValueText: {
    ...typography.body,
    color: colors.textPrimary,
    minWidth: 25, // Ensure space for the number
    textAlign: 'center',
    marginHorizontal: spacing.xs,
  },
  // Totals Section Styles
  totalsSection: {
    marginTop: spacing.xl,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    borderTopWidth: borders.borderWidth,
    borderTopColor: colors.border,
    borderBottomWidth: borders.borderWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface, // Consistent surface color
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
    borderRadius: borders.radiusMedium,
    alignItems: 'center', // Center text inside button
    marginTop: spacing.xl, // Space above the button
  },
  sendActionButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  backLinkContainer: {
    alignSelf: 'center',
    marginTop: spacing.l, // Add space above the link
    padding: spacing.s, // Add some padding for easier tapping
  },
  backLinkText: {
    ...typography.link, // Uses colors.primary by default from theme
    color: colors.primary, // Explicitly ensuring it matches Login's "Forgot details"
    textDecorationLine: 'underline',
  },
});

export default Send;