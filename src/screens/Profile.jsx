import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard'; // For copy functionality

// Import assets and components
import ProfileIcon from '../assets/ProfileIcon.jsx'; // Ensure this asset exists
import ProfilePic from '../assets/profile_pic.png'; // Assuming it's a PNG
import CopyIcon from '../assets/CopyIcon.jsx';
import BottomNavBar from '../components/BottomNavBar.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx'; // Import reusable header
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme'; // Import theme

const ProfileScreen = ({ navigation }) => {
  const handleCopy = (textToCopy) => {
    Clipboard.setString(textToCopy);
    Alert.alert("Copied", `${textToCopy} copied to clipboard!`);
  };

  const handleLogout = () => {
    // Add any pre-logout logic here (e.g., clearing user session, tokens)
    console.log('User logging out');
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="PROFILE" RightIconComponent={ProfileIcon} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Profile Info Section */}
        <View style={styles.profileInfoContainer}>
          <Image source={ProfilePic} style={styles.profilePicture} />
          <View style={styles.walletBalanceContainer}>
            <Text style={styles.walletBalanceLabel}>Wallet balance</Text>
            <Text style={styles.walletBalanceAmount}>R 49 118.61</Text>
          </View>
        </View>

        {/* Account Details Fields */}
        <View style={styles.detailsSection}>
          {/* Account Name */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Account name</Text>
            <View style={styles.detailBox}>
              <Text style={styles.detailValue}>Andre Combrinck</Text>
            </View>
          </View>

          {/* Account Number */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Account number</Text>
            <View style={styles.detailBoxWithIcon}>
              <View style={styles.flexGrow}>
                <Text style={styles.detailValue}>5262994995</Text>
              </View>
              <TouchableOpacity onPress={() => handleCopy('5262994995')} style={styles.copyIconContainer}>
                <CopyIcon width={20} height={20} color={colors.iconDefault} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Blockchain Address */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Blockchain address</Text>
            <View style={styles.detailBoxWithIcon}>
              <View style={styles.flexGrow}>
                <Text style={[styles.detailValue, styles.addressValue]}>0x4908d3a8F67Eb0359916Cd7Ae9033CC21c9d7249</Text>
              </View>
              <TouchableOpacity onPress={() => handleCopy('0x4908d3a8F67Eb0359916Cd7Ae9033CC21c9d7249')} style={styles.copyIconContainer}>
                <CopyIcon width={20} height={20} color={colors.iconDefault} />
              </TouchableOpacity>
            </View>
          </View>

          {/* View/Edit Details Link - MOVED HERE */}
          <TouchableOpacity onPress={() => navigation.navigate('Fulldetails')}>
            <Text style={styles.editDetailsLink}>View/Edit full account details</Text>
          </TouchableOpacity>

          {/* Log Out Link - MOVED HERE */}
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutLink}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    ...commonStyles.safeArea,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: spacing.xl + spacing.xl, // Ensure space for BottomNavBar
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.containerPadding,
  },
  profilePicture: {
    width: 160, // Doubled from 80
    height: 160, // Doubled from 80
    borderRadius: 80, // Doubled from 40 to keep it circular
    marginRight: spacing.containerPadding,
  },
  walletBalanceContainer: {
    flex: 1,
    alignItems: 'flex-end', // Align children to the right
  },
  walletBalanceLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  walletBalanceAmount: {
    ...typography.h2,
    color: '#FFFFFF', // Changed to white
  },
  editDetailsLink: {
    ...typography.link,
    color: colors.primary, // Changed to use theme's primary color
    textAlign: 'center',
    paddingHorizontal: spacing.containerPadding,
    marginBottom: spacing.m, // Adjusted for the logout link below
    textDecorationLine: 'underline',
  },
  logoutLink: {
    ...typography.link,
    color: colors.primary, // Changed to use theme's primary color
    textAlign: 'center',
    paddingHorizontal: spacing.containerPadding,
    marginBottom: spacing.l, // Space before the details section
    textDecorationLine: 'underline',
  },
  detailsSection: {
    paddingHorizontal: spacing.containerPadding,
  },
  detailItem: {
    marginBottom: spacing.l,
  },
  detailLabel: {
    ...typography.label,
    color: colors.textPrimary, // Ensure label is clearly visible
    marginBottom: spacing.s,
  },
  detailBox: {
    backgroundColor: colors.inputBackground,
    borderRadius: borders.radiusMedium,
    paddingVertical: spacing.inputPaddingVertical,
    paddingHorizontal: spacing.inputPaddingHorizontal,
  },
  detailBoxWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borders.radiusMedium,
    paddingVertical: spacing.inputPaddingVertical, // Add vertical padding to the container
    paddingLeft: spacing.inputPaddingHorizontal,   // Add left padding for the text part
  },
  flexGrow: {
    flex: 1, // Allows the text box to take available space
  },
  detailValue: {
    ...typography.body,
    color: colors.inputText,
  },
  addressValue: {
    ...typography.caption, // Use caption style for smaller address text
    color: colors.inputText,
  },
  copyIconContainer: {
    paddingRight: spacing.inputPaddingHorizontal, // Provide space on the right for the icon
    paddingLeft: spacing.s, // Provide some space between text and icon
    justifyContent: 'center', // Center icon if container is taller
    alignItems: 'center',
  },
});

export default ProfileScreen;