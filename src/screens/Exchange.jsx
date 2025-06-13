import React, { useContext } from 'react'; // Import useContext
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'; // Added ActivityIndicator

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import ExchangeIcon from '../assets/ExchangeIcon.jsx'; // Ensure this path and component exist
import BottomNavBar from '../components/BottomNavBar.jsx'; // Ensure this path is correct
import ScreenHeader from '../components/ScreenHeader.jsx'; // Assuming you want to use the standard header
import { colors, typography, spacing, commonStyles } from '../theme/theme.js'; // Import theme
import { AuthContext } from '../context/AuthContext.jsx';
import { AppSettingsContext } from '../context/AppSettingsContext.jsx';

const Exchange = ({ navigation }) => {
  const { user, isLoading: isAuthLoading } = useContext(AuthContext);
  const { appSettings, isLoadingSettings, settingsError } = useContext(AppSettingsContext);

  if (isAuthLoading || isLoadingSettings) {
    return (
      <View style={commonStyles.safeArea}>
        <ScreenHeader title="EXCHANGE" RightIconComponent={ExchangeIcon} />
        <View style={commonStyles.centeredMessageContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={commonStyles.loadingText}>Loading Exchange...</Text>
        </View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }

  // Optional: Display error if settings failed to load
  if (settingsError && !appSettings) {
    return (
      <View style={commonStyles.safeArea}>
        <ScreenHeader title="EXCHANGE" RightIconComponent={ExchangeIcon} />
        <View style={commonStyles.centeredMessageContainer}>
          <Text style={commonStyles.errorTextLarge}>{settingsError}</Text>
        </View>
        <BottomNavBar navigation={navigation} />
      </View>
    );
  }

  return (
    <View style={commonStyles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section: Logo, Title, Icon */}
        <ScreenHeader title="EXCHANGE" RightIconComponent={ExchangeIcon} />

        {/* Main Content Area - Blank for now */}
        <View style={styles.mainContentArea}>
          {/* This area is intentionally blank as per requirements */}
          {/* You can add content here later, e.g., exchange functionalities */}
          <Text style={styles.placeholderText}>Exchange functionality coming soon.</Text>
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
    // <Text style={{ color: '#555555' }}>Exchange functionalities will appear here.</Text>
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  }
});

export default Exchange;