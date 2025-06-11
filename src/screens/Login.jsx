import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios'; 
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      const url = 'http://192.168.23.113/api/login';
      console.log('Attempting POST with axios to:', url);

      const response = await axios.post(url,
        {
          email,
          password,
        },
        {
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          }
        }
      );

      console.log("Axios request response status:", response.status);
      console.log("Axios response data:", response.data);

      const data = response.data;

      if (response.status >= 200 && response.status < 300) {
        console.log('Login successful:', data);
        const userData = data.user;
        navigation.navigate('Profile', { user: userData });
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (e) {
      console.error("Full network error object (axios):", e);
      if (e.response) {
        console.error("Axios error response data:", e.response.data);
        console.error("Axios error response status:", e.response.status);
        const serverMessage = e.response.data?.message;
        if (e.response.status === 403 && serverMessage && serverMessage.includes('Email not verified')) {
          setError(serverMessage + " You might need to check your spam folder.");
        } else {
          setError(serverMessage || `Login failed: ${e.response.status}`);
        }
      } else if (e.request) {
        console.error("Axios error request (no response received):", e.request);
        setError("Network request failed. Check server connection and IP address.");
      } else {
        console.error('Axios setup error message:', e.message);
        setError(e.message || "An unexpected error occurred while setting up the request.");
      }
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Forgot Details Button */}
      <TouchableOpacity
        style={styles.loginButton} 
        onPress={() => navigation.navigate('Reset')}
      >
        <Text style={styles.loginButtonText}>FORGOT DETAILS</Text> 
      </TouchableOpacity>

      
      <View style={styles.spacer} />

     
      <View style={styles.registerButtonContainer}>
        <TouchableOpacity
          style={styles.loginButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.loginButtonText}>REGISTER</Text> 
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
