import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Import your JSX icon components
import ProfileIcon from '../assets/ProfileIcon.jsx';
import WalletIcon from '../assets/WalletIcon.jsx';
import HistoryIcon from '../assets/HistoryIcon.jsx';
import ExchangeIcon from '../assets/ExchangeIcon.jsx';
import HelpIcon from '../assets/HelpIcon.jsx';

const { width } = Dimensions.get('window');

const BottomNavBar = ({ navigation }) => {
  // Placeholder navigation functions. Replace with your actual navigation logic.
  const navigateToHome = () => console.log('Navigate to Home'); // Example: navigation.navigate('Home');
  const navigateToSearch = () => console.log('Navigate to Search'); // Example: navigation.navigate('Search');
  const navigateToAddPost = () => console.log('Navigate to Add Post'); // Example: navigation.navigate('AddPost');
  const navigateToNotifications = () => console.log('Navigate to Notifications'); // Example: navigation.navigate('Notifications');
  const navigateToProfile = () => console.log('Navigate to Profile'); // Example: navigation.navigate('Profile');

  return (
    <View style={styles.navBarContainer}>
      <TouchableOpacity onPress={navigateToHome} style={styles.navItem}>
        <ProfileIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.tintColor}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSearch} style={styles.navItem}>
        <WalletIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.tintColor}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToAddPost} style={[styles.navItem, styles.centralNavItem]}>
        <HistoryIcon
          width={styles.centralIcon.width}
          height={styles.centralIcon.height}
          color={styles.centralIcon.tintColor}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToNotifications} style={styles.navItem}>
        <ExchangeIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.tintColor}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToProfile} style={styles.navItem}>
        <HelpIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.tintColor}
        />
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
    height: 60, // Standard height for a nav bar
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
});

export default BottomNavBar;
