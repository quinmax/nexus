import React, { useState, useContext } from 'react'; // Import useContext
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
// import axios from 'axios'; // No longer needed here for login
// import AsyncStorage from '@react-native-async-storage/async-storage'; // No longer needed here for login
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading: isAuthLoading, authError } = useContext(AuthContext); // Use login and isLoading from context

  const handleLogin = async () => {
    console.log('handleLogin function called');
    console.log('Current email:', email, 'Current password:', password);
    setError('');
    if (!email || !password) {
      console.log('Validation failed: Email or password is empty.');
      setError('Please enter both email and password.');
      return;
    }

    try {
      const userData = await login(email, password); // Call context login function
      if (userData) {
        // Navigation to Profile or Wallet can happen here.
        // The AuthContext now holds the user state.
        navigation.navigate('Profile', { user: userData });
        // Consider navigating to Wallet directly if that's the primary screen after login
        // navigation.navigate('Wallet');
      }
    } catch (e) {
      console.error("Login.jsx: Login failed via context", e.message);
      // The authError state in AuthContext will also be set.
      // You can use that globally or set local error here.
      setError(e.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <Image
        source={require('../assets/nexus_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome to Nexus Wallet</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor={colors.textPlaceholder}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          console.log('Email TextInput changed:', text);
          setEmail(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textPlaceholder}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          console.log('Password TextInput changed:', text);
          setPassword(text);
        }}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      {/* Update button to reflect loading state from context */}
      <TouchableOpacity 
        style={[styles.loginButton, isAuthLoading && commonStyles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isAuthLoading}>
        <Text style={styles.loginButtonText}>{isAuthLoading ? 'LOGGING IN...' : 'LOGIN'}</Text>
      </TouchableOpacity>

      {/* Forgot Details Button */}
      <TouchableOpacity
        style={[styles.loginButton, styles.secondaryButton]}
        onPress={() => navigation.navigate('Reset')}
      >
        <Text style={[styles.loginButtonText, styles.secondaryButtonText]}>FORGOT DETAILS</Text>
      </TouchableOpacity>

      
      <View style={styles.spacer} />

     
      <View style={styles.registerButtonContainer}>
        <TouchableOpacity
          style={[styles.loginButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.loginButtonText, styles.secondaryButtonText]}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.containerPadding,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: spacing.xl,
  },
  welcomeText: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xl + spacing.s,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    borderRadius: borders.radiusMedium,
    paddingHorizontal: spacing.inputPaddingHorizontal,
    marginBottom: spacing.l,
    fontSize: typography.body.fontSize,
    borderWidth: borders.borderWidth,
    borderColor: colors.inputBorder,
  },
  loginButton: { 
    width: '100%',
    height: 50,
    backgroundColor: '#1f2531', 
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.l, 
  },
  loginButtonText: { 
    ...typography.button,
    color: colors.primaryButtonText, 
  },
  secondaryButton: { // New style for FORGOT DETAILS and REGISTER
    backgroundColor: colors.surface, // Lighter background
    borderColor: '#1f2531',         // Border color matching the LOGIN button's background
    borderWidth: borders.borderWidth,
    // marginTop is inherited from loginButton
  },
  secondaryButtonText: { // New text style for these buttons
    color: colors.primaryButtonText, // Darker text for lighter background
    // If colors.primaryButtonText was white, this ensures readability.
    // If you want white text on the lighter button, use colors.primaryButtonText here too.
  },
  spacer: {
    flex: 1,
  },
  registerButtonContainer: {
    width: '100%',
   
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    marginBottom: spacing.m,
    textAlign: 'center',
  },
});

export default Login;
