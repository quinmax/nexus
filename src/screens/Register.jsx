import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import the reusable header
import RegisterIcon from '../assets/RegisterIcon.jsx'; // Import the RegisterIcon

const Register = ({ navigation }) => { // Added navigation prop
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
      <View style={{ marginBottom: spacing.l }}> {/* Added wrapper with marginBottom */}
        <ScreenHeader title="REGISTER" RightIconComponent={RegisterIcon} showBorder={false} />
      </View>

      {/* Input Fields */}
      <InputField
        label="Account name"
        placeholder="Enter account name here"
        autoCapitalize="words"
      />
      <InputField
        label="Full name"
        placeholder="Enter full name here"
        autoCapitalize="words"
      />
      <InputField
        label="Surname"
        placeholder="Enter surname here"
        autoCapitalize="words"
      />
      <InputField
        label="Email address"
        placeholder="Enter email address"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputField
        label="Confirm email"
        placeholder="Confirm email address"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {/* Country Picker */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Country</Text>
        <View style={styles.inputBox}>
          <Picker
            style={[
              styles.picker,
              { color: selectedCountry === "" ? colors.textPlaceholder : colors.inputText }
            ]}
            selectedValue={selectedCountry}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            dropdownIconColor={colors.inputText} // Match text color or use a specific icon color
          >
            <Picker.Item label="Select Country" value="" color={colors.textPlaceholder} />
            <Picker.Item label="Country 1" value="country1" />
            <Picker.Item label="Country 2" value="country2" />
          </Picker>
        </View>
      </View>

      {/* Address Field */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.inputBox, styles.addressInput]}
          placeholder="Enter address here"
          placeholderTextColor={colors.textPlaceholder}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InputField = ({ label, placeholder, keyboardType, autoCapitalize }) => (
  <View style={styles.inputRow}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.inputBox}
      placeholder={placeholder}
      placeholderTextColor={colors.textPlaceholder} // Use themed placeholder color
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background, // Ensures black background from theme
  },
  contentContainer: {
    padding: spacing.containerPadding,
    paddingBottom: spacing.xl, // Consistent padding from theme
  },
  // The existing styles from your Register.jsx context continue below.
  // Note: Many of these are currently hardcoded and do not use the theme.
  container: {
    flex: 1,
    backgroundColor: colors.background, // Use theme
    padding: spacing.containerPadding, // Use theme
  },
  inputRow: {
    // flexDirection: 'row', // Removed for column layout
    // alignItems: 'center', // Removed for column layout
    marginBottom: spacing.m, // Use themed spacing
  },
  label: {
    // color: 'white', // Will use theme
    // width: 120, // No longer needed for stacked layout
    // marginRight: 10, // No longer needed
    ...typography.label, // Apply themed label style
    color: colors.textPrimary, // Ensure label text is visible, or use textSecondary if preferred
    marginBottom: spacing.s, // Add space below the label
  },
  inputBox: {
    // flex: 1, // No longer needed as it takes full width
    backgroundColor: colors.inputBackground, // Use themed input background
    color: colors.inputText, // Use themed input text color
    borderRadius: borders.radiusMedium, // Use themed border radius
    paddingHorizontal: spacing.inputPaddingHorizontal, // Use themed padding
    paddingVertical: spacing.inputPaddingVertical, // Use themed padding
    fontSize: typography.body.fontSize, // Use themed font size
    borderWidth: borders.borderWidth, // Use themed border width
    borderColor: colors.inputBorder, // Use themed border color
    width: '100%', // Ensure input takes full width
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.inputPaddingVertical, // Ensure padding is consistent for multiline
  },
  picker: {
    color: colors.inputText, // Use themed text color for picker
    // backgroundColor: colors.inputBackground, // Picker styling can be tricky; often inherits from parent View
  },
  registerButton: {
    backgroundColor: '#1f2531', // Updated button color
    paddingVertical: spacing.m, // Use themed spacing
    borderRadius: borders.radiusMedium, // Use themed border radius
    alignItems: 'center',
    marginTop: spacing.l, // Use themed spacing
  },
  registerButtonText: { // Renamed for clarity and consistency
    ...typography.button, // Use themed button typography
    color: colors.primaryButtonText, // Use themed button text color
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 15,
    padding: spacing.s, // Add some padding for easier tapping
  },
  backText: {
    ...typography.link, // Use themed link style
    color: colors.textSecondary, // Softer color for "Back"
    textDecorationLine: 'none', // Or 'underline' if preferred
  },
});

export default Register;