import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log('handleLogin function called'); // <-- Add this very first line
    console.log('Current email:', email, 'Current password:', password); // <-- Log current values
    setError(''); // Clear previous errors
    if (!email || !password) {
      console.log('Validation failed: Email or password is empty.'); // <-- Log if validation fails
      setError('Please enter both email and password.');
      return;
    }

    try {
      console.log('Attempting to fetch from: http://192.168.101.112:8000/api/login');
      // Replace with your actual Laravel backend IP/domain if not localhost
      // For Android emulator, use 10.0.2.2 to access localhost of the host machine
      // For iOS simulator, localhost usually works. For physical devices, use your machine's network IP.
      const response = await fetch('http://192.168.101.112:8000/api/login', { // Example for Android Emulator
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('Fetch call completed. Response received.');
      console.log('Login response status:', response.status); // Log status
      // console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()))); // Optional: Log all headers

      console.log('Attempting to parse response as JSON...');
      const data = await response.json();
      console.log('Response parsed as JSON successfully.');
      console.log('Login response data:', data); // Log data

      if (response.ok) {
        console.log('Login successful:', data);
        // TODO: Store the token securely (e.g., AsyncStorage)
        navigation.navigate('Profile'); // Navigate to the Profile screen
      } else if (response.status === 403 && data.message && data.message.includes('Email not verified')) {
        console.log('Setting "Email not verified" error:', data.message); // Log before setError
        setError(data.message + " You might need to check your spam folder.");
      } else {
        console.log('Setting generic login error:', data.message || 'Login failed.'); // Log before setError
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (e) {
      console.error('Login fetch/catch error:', e); // More specific log
      console.error('Error Name:', e.name);
      console.error('Error Message:', e.message);
      // It's possible e.stack is not available or very large, log conditionally or inspect `e` directly
      // console.error('Error Stack:', e.stack);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      {/* Logo */}
      <Image
        source={require('../assets/nexus_logo.png')} // Update with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to Nexus Wallet</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address" // Consider "Email" for brevity
        placeholderTextColor={colors.textPlaceholder}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          console.log('Email TextInput changed:', text);
          setEmail(text);
        }}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password" // Consistent placeholder color
        placeholderTextColor={colors.textPlaceholder}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          console.log('Password TextInput changed:', text);
          setPassword(text);
        }}
      />

      {/* Error Message Display */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Links Container */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Reset')}>
          <Text style={styles.linkText}>Forgot details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // safeArea: { ...commonStyles.safeArea }, // If using SafeAreaView as root
  scrollContainer: { // Changed from 'container' to be more specific
    flexGrow: 1, // Use flexGrow for ScrollView content
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.containerPadding,
  },
  logo: {
    width: 220, // Increased width
    height: 220, // Increased height
    marginBottom: spacing.xl,
  },
  welcomeText: {
    ...typography.h2, // Use themed typography
    color: colors.textPrimary,
    marginBottom: spacing.xl + spacing.s, // 40
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.inputBackground, // Themed input
    color: colors.inputText,
    borderRadius: borders.radiusMedium,
    paddingHorizontal: spacing.inputPaddingHorizontal,
    marginBottom: spacing.l, // 20-24
    fontSize: typography.body.fontSize,
    borderWidth: borders.borderWidth,
    borderColor: colors.inputBorder, // Themed border
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1f2531', // Updated color for the LOGIN button
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.m, // Adjusted margin if error text is present
  },
  loginButtonText: { // Renamed from buttonText
    ...typography.button,
    color: colors.primaryButtonText,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.xl, // 30-32
  },
  linkText: {
    ...typography.link, // Use themed link style
    color: colors.primary, // Changed to use the theme's primary color
    textDecorationLine: 'underline', // Added to underline the text
  },
  errorText: {
    ...typography.body,
    color: colors.error, // Assuming you have an error color in your theme
    marginBottom: spacing.m,
    textAlign: 'center',
  },
});

export default Login;