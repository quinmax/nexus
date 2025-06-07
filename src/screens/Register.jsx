import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, typography, spacing, borders } from '../theme/theme';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { countries } from '../utils/countries.js'; // Import the country list
import RegisterIcon from '../assets/RegisterIcon.jsx';

const Register = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
      <View style={{ marginBottom: spacing.l }}>
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
      <InputField
        label="Password"
        placeholder="Enter password"
        autoCapitalize="none"
        secureTextEntry
      />
      <InputField
        label="Confirm password"
        placeholder="Confirm password"
        autoCapitalize="none"
        secureTextEntry
      />
      
      {/* Country Picker - Fixed text color handling */}
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
            dropdownIconColor={colors.inputText}
          >
            <Picker.Item label="Select Country..." value="" />
            {countries.map((country) => (
              <Picker.Item key={country.value} label={country.label} value={country.value} />
            ))}
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
      <TouchableOpacity 
        style={styles.registerButton} 
        onPress={() => {
          // Add actual registration logic here
      navigation.navigate('Registered'); // Navigate after successful registration
        }}>
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backToLoginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLoginButtonText}>Back to login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InputField = ({ label, placeholder, keyboardType, autoCapitalize, secureTextEntry }) => (
  <View style={styles.inputRow}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.inputBox}
      placeholder={placeholder}
      placeholderTextColor={colors.textPlaceholder}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.containerPadding,
    paddingBottom: spacing.xl,
  },
  inputRow: {
    marginBottom: spacing.m,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.s,
  },
  inputBox: {
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    borderRadius: borders.radiusMedium,
    paddingHorizontal: spacing.inputPaddingHorizontal,
    paddingVertical: spacing.inputPaddingVertical,
    fontSize: typography.body.fontSize,
    borderWidth: borders.borderWidth,
    borderColor: colors.inputBorder,
    width: '100%',
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.inputPaddingVertical,
  },
  picker: {
    color: colors.inputText,
  },
  registerButton: {
    backgroundColor: '#1f2531',
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    marginTop: spacing.l,
  },
  registerButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
  backToLoginButton: {
    alignSelf: 'center',
    marginTop: spacing.l,
    padding: spacing.s,
  },
  backToLoginButtonText: {
    ...typography.link,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Register;