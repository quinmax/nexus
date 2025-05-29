import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png'; // Assuming it's a PNG
import ProfileIcon from '../assets/ProfileIcon.jsx';
import ProfilePic from '../assets/profile_pic.png'; // Assuming it's a PNG
import CopyIcon from '../assets/CopyIcon.jsx';
import BottomNavBar from '../components/BottomNavBar.jsx';

const ProfileScreen = ({ navigation }) => {
  const handleCopy = (textToCopy) => {
    // Implement your copy to clipboard logic here
    // For example, using Clipboard API from 'react-native' or '@react-native-clipboard/clipboard'
    console.log('Copied:', textToCopy);
    // Clipboard.setString(textToCopy);
    // Alert.alert("Copied to clipboard!");
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image source={NexusLogo} style={styles.logo} />
          <Text style={styles.headerTitle}>PROFILE</Text>
          <ProfileIcon width={28} height={28} color="#FFFFFF" />
        </View>

        {/* Profile Info Section */}
        <View style={styles.profileInfoContainer}>
          <Image source={ProfilePic} style={styles.profilePicture} />
          <View style={styles.walletBalanceContainer}>
            <Text style={styles.walletBalanceLabel}>Wallet balance</Text>
            <Text style={styles.walletBalanceAmount}>R 42 457.75</Text>
          </View>
        </View>

        {/* View/Edit Details Link */}
        <TouchableOpacity onPress={() => console.log('Navigate to full account details')}>
          <Text style={styles.editDetailsLink}>View/Edit full account details</Text>
        </TouchableOpacity>

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
              <View style={[styles.detailBox, styles.flexGrow]}>
                <Text style={styles.detailValue}>5262994995</Text>
              </View>
              <TouchableOpacity onPress={() => handleCopy('5262994995')} style={styles.copyIconContainer}>
                <CopyIcon width={20} height={20} color="#888888" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Blockchain Address */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Blockchain address</Text>
            <View style={styles.detailBoxWithIcon}>
              <View style={[styles.detailBox, styles.flexGrow]}>
                <Text style={[styles.detailValue, styles.addressValue]}>0x4908d3a8F67Eb0359916Cd7Ae9033CC21c9d7249</Text>
              </View>
              <TouchableOpacity onPress={() => handleCopy('0x4908d3a8F67Eb0359916Cd7Ae9033CC21c9d7249')} style={styles.copyIconContainer}>
                <CopyIcon width={20} height={20} color="#888888" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 80, // To ensure content is not hidden behind the absolute positioned BottomNavBar
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15, // Adjust as needed for status bar
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make it circular
    marginRight: 20,
  },
  walletBalanceContainer: {
    flex: 1,
  },
  walletBalanceLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },
  walletBalanceAmount: {
    color: '#007AFF', // Blue color
    fontSize: 22,
    fontWeight: 'bold',
  },
  editDetailsLink: {
    color: '#007AFF', // Blue color for links
    fontSize: 14,
    textAlign: 'left',
    paddingHorizontal: 20,
    marginBottom: 25,
    textDecorationLine: 'underline',
  },
  detailsSection: {
    paddingHorizontal: 20,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  detailBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  detailBoxWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for the whole row
    borderRadius: 8,
  },
  flexGrow: {
    flex: 1, // Allows the text box to take available space
  },
  detailValue: {
    color: '#000000',
    fontSize: 16,
  },
  addressValue: {
    fontSize: 14, // Slightly smaller for long addresses
  },
  copyIconContainer: {
    padding: 12, // Makes the touchable area larger
  },
});

export default ProfileScreen;