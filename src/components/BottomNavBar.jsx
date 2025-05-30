import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

// Import your JSX icon components
import ProfileIcon from '../assets/ProfileIcon.jsx';
import WalletIcon from '../assets/WalletIcon.jsx';
import HistoryIcon from '../assets/HistoryIcon.jsx';
import ExchangeIcon from '../assets/ExchangeIcon.jsx';
import HelpIcon from '../assets/HelpIcon.jsx';

const { width } = Dimensions.get('window');

const BottomNavBar = ({ navigation }) => {
  // Placeholder navigation functions. Replace with your actual navigation logic.
  const navigateToProfile = () => navigation.navigate('Profile');
   const navigateToWallet = () => navigation.navigate('Wallet');
  const navigateToHistory = () => console.log('Navigate to Add Post'); // Example: navigation.navigate('AddPost');
  const navigateToExchange = () => console.log('Navigate to Notifications'); // Example: navigation.navigate('Notifications');
  const navigateToHelp = () => console.log('Navigate to Profile'); // Example: navigation.navigate('Profile');

  return (
    <View style={styles.navBarContainer}>
      <TouchableOpacity onPress={navigateToProfile} style={styles.navItem}>
        <ProfileIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.tintColor}
        />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToWallet} style={styles.navItem}>
        <WalletIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.tintColor}
        />
        <Text style={styles.navText}>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToHistory} style={[styles.navItem, styles.centralNavItem]}>
        <HistoryIcon
          width={styles.centralIcon.width}
          height={styles.centralIcon.height}
          color={styles.centralIcon.tintColor}
        />
        <Text style={styles.navText}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToExchange} style={styles.navItem}>
        <ExchangeIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.tintColor}
        />
        <Text style={styles.navText}>Exchange</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToHelp} style={styles.navItem}>
        <HelpIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.tintColor}
        />
        <Text style={styles.navText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1c1c1e', // Dark background for the navbar
    height: 70, // Increased height to accommodate text
    borderTopWidth: 1,
    borderTopColor: '#333333', // Subtle top border
    position: 'absolute', // To position it at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    width: width, // Ensure it spans the full width
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column', // Default is column for View, but good to be explicit if needed
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#8e8e93', // Default icon color (iOS gray) - will be passed as 'color' prop
  },
  centralNavItem: {
    // You might want to style the central button differently
  },
  centralIcon: {
    width: 30, // Larger for a central action button
    height: 30,
    tintColor: '#007AFF', // Example: A different color for the central icon - will be passed as 'color' prop
  },
  navText: {
    color: '#8e8e93', // Same as default icon color, or choose another
    fontSize: 10,
    marginTop: 4, // Space between icon and text
  },
});

export default BottomNavBar;
