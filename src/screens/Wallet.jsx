import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Import assets and components
import WalletIcon from '../assets/WalletIcon.jsx';
import KingdomCoinImage from '../assets/KingdomCoin.jpg'; // Assuming this is the path
import BottomNavBar from '../components/BottomNavBar.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import reusable header
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme'; // Import theme

const CoinCard = ({ title, qtyInWallet, imageSrc, details, onViewFullDetailsPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardQtyTag}>QTY: {qtyInWallet}</Text>
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
    <View style={commonStyles.safeArea}>
      <ScreenHeader title="WALLET" RightIconComponent={WalletIcon} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Wallet Total Balance Section */}
        <View style={styles.balanceSectionContainer}>
          <Text style={styles.balanceLabel}>Wallet total balance</Text>
          <Text style={styles.balanceAmount}>{walletTotalBalance}</Text>
        </View>
        {/* Send Button Section */}
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('Send')}>
            <Text style={styles.sendButtonText}>SEND</Text>
          </TouchableOpacity>
        </View>

        {/* Main Wallet Content Area - Coin Cards */}
        <View style={styles.mainContentContainer}>
          <CoinCard
            title="Kingdom Coin #1"
            qtyInWallet="1" // Example QTY
            imageSrc={KingdomCoinImage}
            details={coin1Details}
            onViewFullDetailsPress={() => handleViewCoinDetails("Kingdom Coin #1")}
          />
          <CoinCard
            title="Kingdom Coin #2" // Assuming a second, similar coin
            qtyInWallet="2" // Example QTY
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
  // safeArea is now commonStyles.safeArea
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: spacing.xl + spacing.xl, // Ensure space for BottomNavBar
  },
  balanceSectionContainer: {
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.l,
    paddingBottom: spacing.s,
    alignItems: 'center', // Center balance info like Profile screen's top section
    backgroundColor: colors.surface, // Card-like background for balance
    borderRadius: borders.radiusMedium,
    marginHorizontal: spacing.containerPadding, // Add horizontal margin
    marginTop: spacing.l, // Add top margin
  },
  balanceLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.s,
  },
  balanceAmount: {
    ...typography.h1, // Or h2, consistent with Profile
    color: colors.textPrimary, // Consistent with Profile balance color
  },
  mainContentContainer: {
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.m,
  },
  actionButtonContainer: {
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.m,
    marginTop: spacing.m, // Add some space after balance
  },
  sendButton: {
    backgroundColor: '#1f2531', // Match Login button color
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center', // Center text horizontally
  },
  sendButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  // Coin Card Styles
  cardContainer: {
    backgroundColor: colors.surface, // Use theme surface color
    borderRadius: borders.radiusMedium,
    padding: spacing.m,
    marginBottom: spacing.l,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  cardTitle: {
    ...typography.h2, // Or a slightly smaller header style if preferred
    fontSize: typography.headerTitle.fontSize, // Match header title size
    color: colors.textPrimary,
  },
  cardQtyTag: {
    ...typography.caption,
    color: colors.textSecondary,
    backgroundColor: colors.inputBackground, // Slightly different background for tag
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: borders.radiusSmall,
  },
  coinImage: {
    width: '100%',
    height: 150, // Adjust as needed
    borderRadius: borders.radiusSmall, // Consistent border radius
    marginBottom: spacing.m,
    resizeMode: 'contain', // Changed to show the complete picture
  },
  detailsListContainer: {
    marginBottom: spacing.m,
  },
  detailItemText: {
    ...typography.body,
    color: colors.textSecondary, // Softer color for details
    fontSize: typography.label.fontSize, // Match label font size
    marginBottom: spacing.s,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start', // Align link to the left
  },
  viewDetailsLink: {
    ...typography.link, // Use themed link style
    color: colors.primary, // Use theme primary color for links
    textDecorationLine: 'underline',
  },
});

export default Wallet;