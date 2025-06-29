import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, typography, spacing, borders } from '../theme/theme';
import ScreenHeader from '../components/ScreenHeader.jsx';
import axios from 'axios'; // Import axios
import { countries } from '../utils/countries.js';
import RegisterIcon from '../assets/RegisterIcon.jsx';

const Register = ({ navigation }) => {
  const [accountName, setAccountName] = useState('');
  const [fullName, setFullName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (isLoading) return;
    if (!accountName.trim()) return navigation.navigate('Regerror', { errorMessage: "Account name cannot be blank." });
    if (!fullName.trim()) return navigation.navigate('Regerror', { errorMessage: "Full name cannot be blank." });
    if (!surname.trim()) return navigation.navigate('Regerror', { errorMessage: "Surname cannot be blank." });
    if (!email.trim()) return navigation.navigate('Regerror', { errorMessage: "Email address cannot be blank." });
    if (!confirmEmail.trim()) return navigation.navigate('Regerror', { errorMessage: "Confirm email cannot be blank." });
    if (!password) return navigation.navigate('Regerror', { errorMessage: "Password cannot be blank." });
    if (!confirmPassword) return navigation.navigate('Regerror', { errorMessage: "Confirm password cannot be blank." });
    if (!selectedCountry) return navigation.navigate('Regerror', { errorMessage: "Country cannot be blank." });
    if (!address.trim()) return navigation.navigate('Regerror', { errorMessage: "Address cannot be blank." });


    if (email !== confirmEmail) {
      return navigation.navigate('Regerror', { errorMessage: "Your Email and Confirm email do not match." });
    }
    if (password !== confirmPassword) {
      return navigation.navigate('Regerror', { errorMessage: "Your Password and Confirm password do not match." });
    }
    try {
      setIsLoading(true);
      const url = 'http://192.168.23.113/api/register';
      console.log("Attempting POST with axios to:", url);

      const response = await axios.post(url,
        { // Request body
          account_name: accountName,
          full_name: fullName,
          surname: surname,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
          country: selectedCountry,
          address: address,
        },
        { // Config object for headers
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      console.log("Axios request response status:", response.status);
      console.log("Axios response data:", response.data);

      const data = response.data;

      if (response.status >= 200 && response.status < 300) {
        navigation.navigate('Registered');
      } else {
        // This path might not be hit if axios throws an error for non-2xx statuses,
        // but included for completeness or if specific non-error handling for 2xx is needed.
        const errorMessage = data.message || "Registration failed. Please try again.";
        let finalErrorMessage = errorMessage;

        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0];
          finalErrorMessage = firstError;
        }
        return navigation.navigate('Regerror', { errorMessage: finalErrorMessage });
      }
    } catch (e) {
      console.error("Full network error object (axios):", e);
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Axios error response data:", e.response.data);
        console.error("Axios error response status:", e.response.status);
        console.error("Axios error response headers:", e.response.headers);
        const serverMessage = e.response.data?.message;
        const validationErrors = e.response.data?.errors;
        let finalErrorMessage = serverMessage || `Server error: ${e.response.status}`; // Default to server message or status
        // If validation errors exist, take the first message from the first field
        if (validationErrors && typeof validationErrors === 'object' && Object.keys(validationErrors).length > 0) {
            finalErrorMessage = Object.values(validationErrors)[0]?.[0] || finalErrorMessage;
        }
        return navigation.navigate('Regerror', { errorMessage: finalErrorMessage });
      } else if (e.request) {
        // The request was made but no response was received
        console.error("Axios error request (no response received):", e.request);
        return navigation.navigate('Regerror', { errorMessage: "No response from server. Check network connection and server status." });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Axios setup error message:', e.message);
        return navigation.navigate('Regerror', { errorMessage: e.message || "An unexpected error occurred while setting up the request." });
      }
    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
      <View style={{ marginBottom: spacing.l }}>
        <ScreenHeader title="REGISTER" RightIconComponent={RegisterIcon} showBorder={false} />
      </View>


      <InputField
        label="Account name"
        placeholder="Enter account name here"
        autoCapitalize="words"
        value={accountName}
        onChangeText={setAccountName}
      />
      <InputField
        label="Full name"
        placeholder="Enter full name here"
        autoCapitalize="words"
        value={fullName}
        onChangeText={setFullName}
      />
      <InputField
        label="Surname"
        placeholder="Enter surname here"
        autoCapitalize="words"
        value={surname}
        onChangeText={setSurname}
      />
      <InputField
        label="Email address"
        placeholder="Enter email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        label="Confirm email"
        placeholder="Confirm email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
      />
      <InputField
        label="Password"
        placeholder="Enter password"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <InputField
        label="Confirm password"
        placeholder="Confirm password"
        autoCapitalize="none"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />


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


      <View style={styles.inputRow}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.inputBox, styles.addressInput]}
          placeholder="Enter address here"
          placeholderTextColor={colors.textPlaceholder}
          multiline
          numberOfLines={4}
          value={address}
          onChangeText={setAddress}
        />
      </View>


      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={isLoading}>
        <Text style={styles.registerButtonText}>{isLoading ? 'REGISTERING...' : 'REGISTER'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backToLoginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLoginButtonText}>Back to login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InputField = ({ label, placeholder, keyboardType, autoCapitalize, secureTextEntry, value, onChangeText }) => (
  <View style={styles.inputRow}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.inputBox}
      placeholder={placeholder}
      placeholderTextColor={colors.textPlaceholder}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: spacing.m,
  }
});

export default Register;
