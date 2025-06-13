import React, { useContext } from 'react'; // Import useContext
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'; // Added ActivityIndicator

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import HelpIcon from '../assets/HelpIcon.jsx'; // Ensure this path and component exist
import BottomNavBar from '../components/BottomNavBar.jsx'; // Ensure this path is correct
import ScreenHeader from '../components/ScreenHeader.jsx'; // Assuming standard header
import { colors, typography, spacing, commonStyles } from '../theme/theme.js'; // Import theme
import { AuthContext } from '../context/AuthContext.jsx'; // Optional, if help might be user-specific
import { AppSettingsContext } from '../context/AppSettingsContext.jsx'; // Optional, if help content depends on settings

const Help = ({ navigation }) => {
  // const { user, isLoading: isAuthLoading } = useContext(AuthContext); // Uncomment if needed
  // const { appSettings, isLoadingSettings, settingsError } = useContext(AppSettingsContext); // Uncomment if needed

  // Example loading state if contexts were used:
  // if (isAuthLoading || isLoadingSettings) {
  //   return (
  //     <View style={commonStyles.safeArea}>
  //       <ScreenHeader title="HELP" RightIconComponent={HelpIcon} />
  //       <View style={commonStyles.centeredMessageContainer}>
  //         <ActivityIndicator size="large" color={colors.primary} />
  //       </View>
  //       <BottomNavBar navigation={navigation} />
  //     </View>
  //   );
  // }

  return (
    <View style={commonStyles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section: Logo, Title, Icon */}
        <ScreenHeader title="HELP" RightIconComponent={HelpIcon} />

        {/* Main Content Area - Blank for now */}
        <View style={styles.mainContentArea}>
          {/* This area is intentionally blank as per requirements */}
          {/* You can add content here later, e.g., FAQs, contact info */}
          <Text style={styles.placeholderText}>Help content coming soon.</Text>
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
    paddingBottom: spacing.xl + spacing.xl, // Space for BottomNavBar
  },
  mainContentArea: {
    flex: 1, // This will make the blank area take up available space
    justifyContent: 'center', // Optional: if you want to center placeholder text later
    alignItems: 'center',     // Optional: if you want to center placeholder text later
    padding: spacing.containerPadding,
    // Add any specific styling for the blank area if needed in the future
    // For example, a placeholder text:
    // <Text style={{ color: '#555555' }}>Help content will appear here.</Text>
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  }
});

export default Help;