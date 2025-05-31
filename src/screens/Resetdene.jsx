import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader.jsx';
import ResetIcon from '../assets/Reset.jsx'; // Using the same icon as Reset.jsx
import { colors, typography, spacing, commonStyles } from '../theme/theme';

const ResetdeneScreen = ({ navigation }) => {
  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="RESET CREDENTIALS" RightIconComponent={ResetIcon} />
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContentArea}>
          <Text style={styles.confirmationText}>
            The instructions on how to reset your login credentials has been emailed to you, please remember to check your spam folder.
          </Text>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backButtonText}>Back to login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* No BottomNavBar for a focused flow */}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...commonStyles.safeArea,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center content vertically for this simple message screen
  },
  mainContentArea: {
    paddingHorizontal: spacing.containerPadding,
    paddingBottom: spacing.xl,
  },
  confirmationText: {
    ...typography.body,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xl + spacing.l, // More space before the back button
    lineHeight: typography.body.fontSize * 1.5, // Improve readability for multi-line text
  },
  backButton: {
    alignSelf: 'center',
    marginTop: spacing.l,
    padding: spacing.s,
  },
  backButtonText: {
    ...typography.link,
    color: colors.primary, // Using primary color for this link
    textDecorationLine: 'underline',
  },
});

export default ResetdeneScreen;