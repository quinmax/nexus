import React, { useState } from 'react'; // Import useState
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';

// Import assets and components
import WalletIcon from '../assets/WalletIcon.jsx';
import KingdomCoinImage from '../assets/Kingdom_Coin_w.jpg'; // Changed to the new image
import BottomNavBar from '../components/BottomNavBar.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import reusable header
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme'; // Import theme

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CoinCard = ({ title, displayMetricValue, imageSrc, details, onViewFullDetailsPress, displayValue }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardQtyTag}>Total Oz owned : {displayMetricValue}</Text>
      </View>
      {displayValue && (
        <Text style={styles.cardDisplayValueText}>{displayValue}</Text>
      )}
      <Image source={imageSrc} style={styles.coinImage} />

      <TouchableOpacity onPress={toggleExpansion} style={styles.expandCollapseButton}>
        <Text style={styles.expandCollapseButtonText}>
          {isExpanded ? 'Hide Details [-]' : 'Show Details [+]'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.detailsContent}>
          <View style={styles.detailsListContainer}>
            {details.map((item, index) => (
              <Text key={index} style={styles.detailItemText}>{item}</Text>
            ))}
          </View>
          <TouchableOpacity onPress={onViewFullDetailsPress} style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsLink}>View full coin details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Wallet = ({ navigation }) => {
  const walletTotalBalance = "R 49 118.61"; // Placeholder
  const kingdomCoin1OzFineGoldValue = "Value : R 49 118.61"; 

  const coin1Details = [
    "Current value per coin: R 59 609.96",
    "Vault verified: 20/05/2025",
    "Total in vault: 100",
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
            title="Kingdom Coin 1 Oz fine gold" // Updated title
            displayMetricValue="0.824" // New prop and value
            imageSrc={KingdomCoinImage}
            displayValue={kingdomCoin1OzFineGoldValue} // Use updated constant
            details={coin1Details}
            onViewFullDetailsPress={() => handleViewCoinDetails("Kingdom Coin 1 Oz fine gold")} // Updated argument
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
    flexDirection: 'column', // Changed to column
    alignItems: 'flex-start', // Align items to the start of the column
    marginBottom: spacing.s, // Adjusted margin
  },
  cardTitle: {
    ...typography.h2, // Or a slightly smaller header style if preferred
    fontSize: typography.headerTitle.fontSize, // Match header title size
    color: colors.textPrimary,
  },
  cardQtyTag: {
    marginTop: spacing.xs, // Add some space above the QTY tag
    ...typography.caption,
    color: colors.textSecondary,
    backgroundColor: colors.inputBackground, // Slightly different background for tag
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: borders.radiusSmall,
  },
  cardDisplayValueText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.m, // Space before the image
  },
  coinImage: {
    width: '100%',
    height: 150, // Adjust as needed
    borderRadius: borders.radiusSmall, // Consistent border radius
    marginBottom: spacing.m,
    resizeMode: 'contain', // Changed to show the complete picture
  },
  expandCollapseButton: {
    paddingVertical: spacing.s,
    marginBottom: spacing.s,
    alignItems: 'flex-start', // Align text to the start
  },
  expandCollapseButtonText: {
    ...typography.link,
    color: colors.primary,
    // textDecorationLine: 'underline', // Optional: if you want it to look more like a link
  },
  detailsContent: {
    // Styles for the container of expanded details if needed
    // For example, adding a top border or different background
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