import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// Import assets and components
import NexusLogo from '../assets/nexus_logo.png';
import HistoryIcon from '../assets/HistoryIcon.jsx'; // Ensure this path and component exist
import BottomNavBar from '../components/BottomNavBar.jsx'; // Ensure this path is correct

const History = ({ navigation }) => {
  return (
    <View style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section: Logo, Title, Icon */}
        <View style={styles.headerContainer}>
          <Image source={NexusLogo} style={styles.logo} />
          <Text style={styles.headerTitle}>HISTORY</Text>
          {/*
            Assuming HistoryIcon is an SVG component similar to WalletIcon.
            Adjust width, height, and color props as needed.
          */}
          <HistoryIcon width={28} height={28} color="#FFFFFF" />
        </View>

        {/* Main Content Area - Blank for now */}
        <View style={styles.mainContentArea}>
          {/* This area is intentionally blank as per requirements */}
          {/* You can add content here later */}
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // Black background
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1, // Ensure content can fill space or scroll
    paddingBottom: 80, // Space for BottomNavBar
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15, // Adjust for status bar if necessary
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Consistent border color
  },
  logo: {
    width: 30, // Small logo
    height: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainContentArea: {
    flex: 1, // This will make the blank area take up available space
    justifyContent: 'center', // Optional: if you want to center placeholder text later
    alignItems: 'center',     // Optional: if you want to center placeholder text later
    padding: 20,
    // Add any specific styling for the blank area if needed in the future
    // For example, a placeholder text:
    // <Text style={{ color: '#555555' }}>Transaction history will appear here.</Text>
  },
});

export default History;