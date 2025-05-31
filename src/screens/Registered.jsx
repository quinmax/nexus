import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader.jsx';
import RegisterIcon from '../assets/RegisterIcon.jsx'; // Using the same icon as Register.jsx
import { colors, typography, spacing, commonStyles } from '../theme/theme';

const RegisteredScreen = ({ navigation }) => {
  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="REGISTER" RightIconComponent={RegisterIcon} showBorder={false} />
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContentArea}>
          <Text style={styles.confirmationText}>
            Thank you for registering, an activation link will be sent to your email. After clicking the link you can use your credentials to log in.
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
    // justifyContent: 'center', // Align content to top
  },
  mainContentArea: {
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.xl, // Space below header
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

export default RegisteredScreen;