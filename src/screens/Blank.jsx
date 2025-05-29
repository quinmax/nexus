import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavBar from '../components/BottomNavBar'; // Import the BottomNavBar

// Assuming 'Blank' screen will receive navigation prop from a navigator
const Blank = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* You can add other content for the blank screen here if needed */}
      {/* For now, it will be a blank background with the navbar at the bottom */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // justifyContent: 'flex-end', // Not strictly necessary as BottomNavBar is absolutely positioned
  },
});

export default Blank;
