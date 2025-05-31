import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader.jsx';
import ResetIcon from '../assets/Reset.jsx'; // Import the SVG icon
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';

const ResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    // Add your password reset logic here
    // e.g., call an API to send a reset link
    console.log('Resetting password for email:', email);
    // Potentially navigate to a confirmation screen or back to Login
    // For now, let's assume the API call was successful.
    // alert('If this email is registered, a reset link will be sent.'); // You might keep this or rely on the Resetdone screen.
    navigation.navigate('Resetdone');
  };

  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="RESET CREDENTIALS" RightIconComponent={ResetIcon} />
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContentArea}>
          <Text style={styles.instructionText}>
            Enter your email address to reset credentials
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={colors.textPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>RESET</Text>
          </TouchableOpacity>

          {/* Back to Login Link */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backButtonText}>Back to login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* No BottomNavBar for a focused flow like password reset */}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...commonStyles.safeArea,
  },
  scrollContentContainer: {
    flexGrow: 1,
    // justifyContent: 'center', // Ensure this is commented out or removed
  },
  mainContentArea: {
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.xl, // Ensure this top padding is present
    paddingBottom: spacing.xl, // Add some padding at the bottom
  },
  instructionText: {
    ...typography.body,
    color: colors.textPrimary,
    textAlign: 'left',
    marginBottom: spacing.xl,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.inputBackground,
    color: colors.inputText, // Ensure this is correct from theme
    borderRadius: borders.radiusMedium,
    paddingHorizontal: spacing.inputPaddingHorizontal,
    marginBottom: spacing.l,
    fontSize: typography.body.fontSize,
    borderWidth: borders.borderWidth,
    borderColor: colors.inputBorder,
  },
  resetButton: {
    backgroundColor: '#1f2531', // Match Login button color
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    marginTop: spacing.m,
  },
  resetButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  backButton: {
    alignSelf: 'center',
    marginTop: spacing.l, // Add some space above the back button
    padding: spacing.s, // Add some padding for easier tapping
  },
  backButtonText: {
    ...typography.link,
    color: colors.primary, // Changed to use the theme's primary color
    textDecorationLine: 'underline', // Added to underline the text
  },
});

export default ResetScreen;