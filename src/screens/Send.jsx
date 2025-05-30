import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import WalletIcon from '../assets/WalletIcon.jsx';
import BottomNavBar from '../components/BottomNavBar.jsx';

const Send = ({ navigation }) => {
  // Hardcoded data as per requirements
  const coins = [
    { name: "Kingdom Coin #1", wallet: "2", sendValue: "R 22 457,75", currentQuantity: "0" },
    { name: "Kingdom Coin #2", wallet: "2", sendValue: "R 22 457,75", currentQuantity: "0" },
  ];
  const totalWallet = "4";
  const totalSend = "R 42 457,75"; // Hardcoded as per reference

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

          {/* Coin Selection Table */}
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={[styles.tableRowBase, styles.tableHeaderRow]}>
              <View style={[styles.tableCellBase, styles.colFlexCoinName, styles.cellWithRightBorder]}>
                {/* Empty header cell as per "Empty | Wallet | Send" */}
                <Text style={[styles.headerText, styles.leftAlignedText]}></Text>
              </View>
              <View style={[styles.tableCellBase, styles.colFlexWallet, styles.cellWithRightBorder]}>
                <Text style={[styles.headerText, styles.rightAlignedText]}>Wallet</Text>
              </View>
              <View style={[styles.tableCellBase, styles.colFlexSend]}>
                <Text style={[styles.headerText, styles.rightAlignedText]}>Send</Text>
              </View>
            </View>

            {/* Coin Data Rows */}
            {coins.map((coin, index) => (
              <View key={index} style={styles.tableRowBase}>
                <View style={[styles.tableCellBase, styles.colFlexCoinName, styles.cellWithRightBorder]}>
                  <Text style={[styles.cellText, styles.leftAlignedText]}>{coin.name}</Text>
                </View>
                <View style={[styles.tableCellBase, styles.colFlexWallet, styles.cellWithRightBorder]}>
                  <Text style={[styles.cellText, styles.rightAlignedText]}>{coin.wallet}</Text>
                </View>
                <View style={[styles.tableCellBase, styles.colFlexSend]}>
                  <Text style={[styles.sendValueText]}>{coin.sendValue}</Text>
                  <View style={styles.quantitySelectorContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => console.log('Decrement quantity for ' + coin.name)}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValueText}>{coin.currentQuantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => console.log('Increment quantity for ' + coin.name)}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* Total Row */}
            <View style={[styles.tableRowBase, styles.lastTableRow]}>
              <View style={[styles.tableCellBase, styles.colFlexCoinName, styles.cellWithRightBorder]}>
                <Text style={[styles.cellText, styles.totalRowText, styles.leftAlignedText]}>Total</Text>
              </View>
              <View style={[styles.tableCellBase, styles.colFlexWallet, styles.cellWithRightBorder]}>
                <Text style={[styles.cellText, styles.totalRowText, styles.rightAlignedText]}>{totalWallet}</Text>
              </View>
              <View style={[styles.tableCellBase, styles.colFlexSend]}>
                <Text style={[styles.cellText, styles.totalRowText, styles.rightAlignedText]}>{totalSend}</Text>
              </View>
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
  tableContainer: {
    marginVertical: 25,
    borderWidth: 1,
    borderColor: '#555555', // Table outer border
    borderRadius: 8,
    overflow: 'hidden', // Clip row borders to container radius
  },
  tableRowBase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Row separator
  },
  tableHeaderRow: {
    backgroundColor: '#101010', // Slightly different background for header
  },
  lastTableRow: {
    borderBottomWidth: 0, // No bottom border for the last row (Total row)
  },
  tableCellBase: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  cellWithRightBorder: {
    borderRightWidth: 1,
    borderRightColor: '#333333', // Column separator
  },
  // Flex distribution for columns
  colFlexCoinName: { // Used for empty header cell and coin name data cells
    flex: 2.5,
  },
  colFlexWallet: {
    flex: 1,
  },
  colFlexSend: {
    flex: 2,
  },
  headerText: {
    color: '#AEAEB2', // Light grey for header text
    fontSize: 13,
    fontWeight: '600',
  },
  cellText: {
    color: '#E0E0E0', // Light grey for data text
    fontSize: 14,
  },
  rightAlignedText: {
    textAlign: 'right',
  },
  leftAlignedText: {
    textAlign: 'left',
  },
  sendValueText: {
    color: '#E0E0E0',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 8, // Space between value and quantity selector
  },
  quantitySelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align selector to the right
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15, // Circular button
    borderWidth: 1,
    borderColor: '#007AFF', // Blue outline
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6, // Spacing around buttons
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
  },
  totalRowText: {
    fontWeight: 'bold', // Bold for total values
    fontSize: 15,
    color: '#FFFFFF', // White text for totals
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