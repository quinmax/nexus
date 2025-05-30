import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import WalletIcon from '../assets/WalletIcon.jsx'; // Make sure this path is correct
import BottomNavBar from '../components/BottomNavBar.jsx'; // Make sure this path is correct

const Sent = ({ navigation }) => {
  const handleBackToWallet = () => {
    navigation.navigate('Wallet');
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section: Logo, Title, Icon */}
        <View style={styles.headerContainer}>
          <Image source={NexusLogo} style={styles.logo} />
          <Text style={styles.headerTitle}>SENT</Text>
          <WalletIcon width={28} height={28} color="#FFFFFF" />
        </View>

        {/* Main Content Area */}
        <View style={styles.contentBody}>
          <Text style={styles.successText}>Send transaction successful</Text>
          <TouchableOpacity onPress={handleBackToWallet} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
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
    backgroundColor: '#000000', // Black background
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1, // Ensure content can fill space or scroll
    paddingBottom: 80, // Space for BottomNavBar if content were to scroll past it
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15, // Adjust for status bar if necessary
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Consistent border color
  },
  logo: {
    width: 30, // Small logo
    height: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentBody: {
    flex: 1, // Take remaining vertical space in ScrollView
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    paddingHorizontal: 20,
    paddingBottom: 20, // Some padding at the bottom of this centered block
  },
  successText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: '600', // Slightly bold
    textAlign: 'center',
    marginBottom: 30, // Space before the "Back" button
  },
  backButton: {
    // Add padding for a larger touch target if desired
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold', // Make it look more like a button/link
    // textDecorationLine: 'underline', // Optional: if you want an underline
  },
});

export default Sent;