import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import WalletIcon from '../assets/WalletIcon.jsx';
import BottomNavBar from '../components/BottomNavBar.jsx';

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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Header Section: Logo, Title, Icon */}
        <View style={styles.headerContainer}>
          <Image source={NexusLogo} style={styles.logo} />
          <Text style={styles.headerTitle}>CONFIRM</Text>
          <WalletIcon width={28} height={28} color="#FFFFFF" />
        </View>

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
              placeholderTextColor="#8e8e93"
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
    paddingBottom: 100, // Space for Confirm button and BottomNavBar
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
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
  infoHeading: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  accountDetailSection: {
    marginBottom: 20,
  },
  otpSection: {
    marginBottom: 25,
  },
  detailLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputBox: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
  },
  displayInputBox: {
    backgroundColor: '#1c1c1e', // Grey input box
    color: '#FFFFFF', // White text
    borderColor: '#333333',
  },
  otpInputBox: {
    backgroundColor: '#FFFFFF', // White input box
    color: '#000000', // Black text for input
    borderColor: '#8e8e93',
  },
  coinCardSection: {
    backgroundColor: '#101010', // Darker card background
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#444444',
  },
  coinItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  coinNameText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    flex: 2, // Allow more space for name
  },
  coinDetailText: {
    color: '#AEAEB2',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 5,
  },
  totalLabelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 2,
  },
  totalValueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  confirmButton: {
    backgroundColor: '#8e8e93', // Grey button
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Confirm;