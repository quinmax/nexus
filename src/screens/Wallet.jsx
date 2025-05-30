import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import WalletIcon from '../assets/WalletIcon.jsx';
import KingdomCoinImage from '../assets/KingdomCoin.jpg'; // Assuming this is the path
import BottomNavBar from '../components/BottomNavBar.jsx';

const CoinCard = ({ title, qtyInWallet, imageSrc, details, onViewFullDetailsPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardQtyTag}>{qtyInWallet}</Text>
      </View>
      <Image source={imageSrc} style={styles.coinImage} />
      <View style={styles.detailsListContainer}>
        {details.map((item, index) => (
          <Text key={index} style={styles.detailItemText}>{item}</Text>
        ))}
      </View>
      <TouchableOpacity onPress={onViewFullDetailsPress} style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsLink}>View full coin details</Text>
      </TouchableOpacity>
    </View>
  );
};

const Wallet = ({ navigation }) => {
  const walletTotalBalance = "R 50 000.00"; // Placeholder

  const coin1Details = [
    "Current value per coin: R 11 228,88",
    "Minted: 20 May 2025",
    "Total minted: 100",
    "Weight per coin: 0.25 ozt",
    "Vault verified: 20/05/2025",
  ];

  const handleViewCoinDetails = (coinName) => {
    console.log(`Navigate to full details for ${coinName}`);
    // Example: navigation.navigate('CoinDetailScreen', { coinName });
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image source={NexusLogo} style={styles.logo} />
          <Text style={styles.headerTitle}>WALLET</Text>
          <WalletIcon width={28} height={28} color="#FFFFFF" />
        </View>

        {/* Wallet Total Balance Section */}
        <View style={styles.balanceSectionContainer}>
          <Text style={styles.balanceLabel}>Wallet total balance</Text>
          <Text style={styles.balanceAmount}>{walletTotalBalance}</Text>
        </View>

        {/* Send Button Section */}
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={() => console.log('Send button pressed')}>
            <Text style={styles.sendButtonText}>SEND</Text>
          </TouchableOpacity>
        </View>

        {/* Main Wallet Content Area - Coin Cards */}
        <View style={styles.mainContentContainer}>
          <CoinCard
            title="Kingdom Coin #1"
            qtyInWallet="OTY in wallet"
            imageSrc={KingdomCoinImage}
            details={coin1Details}
            onViewFullDetailsPress={() => handleViewCoinDetails("Kingdom Coin #1")}
          />
          <CoinCard
            title="Kingdom Coin #2" // Assuming a second, similar coin
            qtyInWallet="OTY in wallet"
            imageSrc={KingdomCoinImage} // Replace if different image
            details={coin1Details} // Replace if different details
            onViewFullDetailsPress={() => handleViewCoinDetails("Kingdom Coin #2")}
          />
        </View>

      </ScrollView>
      {/* Bottom Navigation Bar */}
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
    paddingBottom: 80, // To ensure content is not hidden behind the absolute positioned BottomNavBar
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
  balanceSectionContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 5, // Further reduced bottom padding to decrease space above the send button
    alignItems: 'flex-start',
  },
  balanceLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#007AFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  mainContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5, // Further reduce vertical spacing for this container
    alignItems: 'stretch', // Make button take full width if desired, or 'center'
  },
  sendButton: {
    backgroundColor: '#8e8e93', // Grey color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center', // Center text horizontally
  },
  sendButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Coin Card Styles
  cardContainer: {
    backgroundColor: '#1c1c1e', // Dark grey, similar to nav bar
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardQtyTag: {
    color: '#8e8e93', // Subtle grey
    fontSize: 12,
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  coinImage: {
    width: '100%',
    height: 150, // Adjust as needed
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover', // Or 'contain' depending on image aspect ratio
  },
  detailsListContainer: {
    marginBottom: 15,
  },
  detailItemText: {
    color: '#E0E0E0', // Light grey for details
    fontSize: 14,
    marginBottom: 8,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start', // Align link to the left
  },
  viewDetailsLink: {
    color: '#00AFFF', // A slightly different blue for links within cards
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default Wallet;