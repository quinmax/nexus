import React from 'react';
import { View, StyleSheet } from 'react-native';

const Blank = () => {
  return (
    <View style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default Blank;