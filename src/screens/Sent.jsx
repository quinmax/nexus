import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Import assets and components
import WalletIcon from '../assets/WalletIcon.jsx'; // Make sure this path is correct
import BottomNavBar from '../components/BottomNavBar.jsx'; // Make sure this path is correct
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import reusable header
import { colors, typography, spacing, commonStyles } from '../theme/theme'; // Import theme

const Sent = ({ navigation }) => {
  const handleBackToWallet = () => {
    navigation.navigate('Wallet');
  };

  return (
    <View style={commonStyles.safeArea}>
      <ScreenHeader title="SENT" RightIconComponent={WalletIcon} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Main Content Area */}
        <View style={styles.contentBody}>
          <Text style={styles.successText}>Send transaction successful</Text>
          <TouchableOpacity onPress={handleBackToWallet} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Wallet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // Now using commonStyles.safeArea
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1, // Ensure content can fill space or scroll
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center contentBody horizontally
    paddingBottom: spacing.xl, // Add some padding at the bottom
  },
  contentBody: {
    // flex: 1, // No longer needed as scrollContentContainer handles flexGrow and centering
    alignItems: 'center', // Center content horizontally
    paddingHorizontal: spacing.containerPadding,
  },
  successText: {
    ...typography.h2, // Use a prominent typography style
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xl + spacing.l, // More space before the "Back" button
    lineHeight: typography.h2.fontSize * 1.4, // Improve readability for multi-line text
  },
  backButton: {
    alignSelf: 'center', // Ensure it's centered if contentBody alignItems changes
    marginTop: spacing.l, // Keep some space if needed, but marginBottom on successText is primary
    padding: spacing.s, // Add some padding for easier tapping
  },
  backButtonText: {
    ...typography.link,
    color: colors.primary, // Use theme's primary color for links
    textDecorationLine: 'underline',
  },
});

export default Sent;