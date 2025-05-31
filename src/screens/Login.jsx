import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Email:', email, 'Password:', password);
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
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password" // Consistent placeholder color
        placeholderTextColor={colors.textPlaceholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Links Container */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
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
    marginTop: spacing.l, // 20-24
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
    color: '#4c4d4d', // Updated text color for Register and Forgot details links
  },
});

export default Login;