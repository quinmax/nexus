import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing, borders } from '../theme/theme';
import ScreenHeader from '../components/ScreenHeader.jsx';
import RegisterIcon from '../assets/RegisterIcon.jsx'; // Assuming you want the same icon

const Regerror = ({ route, navigation }) => {
  const { errorMessage } = route.params;

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={{ width: '100%', marginBottom: spacing.l }}>
        <ScreenHeader title="REGISTRATION ERROR" RightIconComponent={RegisterIcon} showBorder={false} />
      </View>

      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Or navigation.navigate('Register')
      >
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing.containerPadding,
    alignItems: 'center', // Keeps the errorBox and button horizontally centered
    // justifyContent: 'center', // Removed to allow content to flow from the top
  },
  errorBox: {
    backgroundColor: colors.errorBackground || '#ffebee', // Provide a fallback error background
    padding: spacing.l,
    borderRadius: borders.radiusMedium,
    marginBottom: spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body, // Or a specific error typography
    color: colors.error || 'red', // Provide a fallback error color
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#1f2531', // Consistent with Register button
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xl,
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
  },
  backButtonText: {
    ...typography.button,
    color: colors.primaryButtonText,
  },
});

export default Regerror;