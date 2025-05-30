import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import WalletIcon from '../assets/WalletIcon.jsx';
import BottomNavBar from '../components/BottomNavBar.jsx';

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
    <View style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Header Section: Logo, Title, Icon */}
        <View style={styles.headerContainer}>
          <Image source={NexusLogo} style={styles.logo} />
          <Text style={styles.headerTitle}>SEND</Text>
          <WalletIcon width={28} height={28} color="#FFFFFF" />
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContentContainer}>
          {/* Send to Account number Section */}
          <View style={styles.sendToAccountSection}>
            <Text style={styles.sendToAccountTitle}>Send to Account number</Text>
            <TextInput
              style={styles.accountNumberInput}
              placeholder="Enter receiving account number here"
              placeholderTextColor="#8e8e93"
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
          <TouchableOpacity style={styles.sendActionButton} onPress={() => console.log('Send action pressed')}>
            <Text style={styles.sendActionButtonText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 100, // Space for Send button and BottomNavBar
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15, // Adjust if not using SafeAreaView or for status bar height
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sendToAccountSection: {
    alignItems: 'center', // Centers the title "Send to Account number"
    marginVertical: 20,
  },
  sendToAccountTitle: {
    color: '#FFFFFF',
    fontSize: 18, // As per "Clean minimal design with appropriate font sizes"
    fontWeight: '600',
    marginBottom: 15,
  },
  accountNumberInput: {
    backgroundColor: '#1c1c1e', // Dark input field
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%', // Full width within padded container
    fontSize: 16,
    textAlign: 'left', // Standard for input fields
    borderWidth: 1,
    borderColor: '#333333',
  },
  // Styles for Per-Coin Sections
  coinSection: {
    marginVertical: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: '#444444', // Border for the entire coin's block
    borderRadius: 8,
    backgroundColor: '#101010', // Slightly different background for the block
  },
  coinSectionHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    textAlign: 'center',
  },
  coinDetailsContainer: {
    flexDirection: 'row', // Wallet and Send info side-by-side
    justifyContent: 'space-between',
  },
  coinInfoColumn: {
    flex: 1,
    paddingHorizontal: 5, // Add some padding within each info column
  },
  columnSubHeader: {
    color: '#AEAEB2',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Increased spacing for clarity
  },
  detailLabel: {
    color: '#AEAEB2',
    fontSize: 13,
    width: 55, // Ensures all labels take up the same space. Adjust if "Value:" needs more/less.
  },
  detailValue: {
    flex: 1, // Ensure it takes available space to align with quantityControls
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 5, // Match the 5px horizontal margin/padding of the rightmost button/text in quantityControls
    height: 28, // Match the height of the quantityButton for consistent vertical alignment
    lineHeight: 28, // Vertically center the text within the new height (for single line text)
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to the right of the "Qty:" label
    flex: 1, // Allow it to take remaining space in detailRow if needed
  },
  // Totals Section Styles
  totalsSection: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    backgroundColor: '#0A0A0A', // Slightly different background for totals
  },
  totalRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalLabel: {
    color: '#AEAEB2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalValueText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  quantityButton: {
    width: 28, // Slightly smaller for better fit
    height: 28,
    borderRadius: 14, // Circular button
    borderWidth: 1,
    borderColor: '#007AFF', // Blue outline
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Adjusted spacing
    backgroundColor: '#1c1c1e', // Button background
  },
  quantityButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    minWidth: 20, // Ensure space for the number
    textAlign: 'center',
    marginHorizontal: 5, // Spacing around the number
    paddingHorizontal: 5, // Padding for the number itself
  },
  sendActionButton: {
    backgroundColor: '#007AFF', // Prominent blue
    paddingVertical: 16,
    paddingHorizontal: 20, // Internal padding
    borderRadius: 8,
    alignItems: 'center', // Center text inside button
    marginTop: 30, // Space above the button
    // This button will stretch if its parent has alignItems: 'stretch'
    // or it will be as wide as its content + padding.
    // For full-width similar to input, ensure parent container allows it.
  },
  sendActionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Send;