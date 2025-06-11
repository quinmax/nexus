import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ScreenHeader from '../components/ScreenHeader.jsx';
import ProfileIcon from '../assets/ProfileIcon.jsx'; // Re-using ProfileIcon, or create a new one
import BottomNavBar from '../components/BottomNavBar.jsx';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';

const FulldetailsScreen = ({ route, navigation }) => {
  // Extract user data passed from ProfileScreen
  const user = route.params?.user || {};
  
  const DetailItem = ({ label, value }) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.detailBox}>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <ScreenHeader title="FULL DETAILS" RightIconComponent={ProfileIcon} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContentArea}>
          <DetailItem label="Account name" value={user.account_name || 'N/A'} />
          <DetailItem label="Full name" value={user.full_name || 'N/A'} />
          <DetailItem label="Surname" value={user.surname || 'N/A'} />
          <DetailItem label="Email address" value={user.email || 'N/A'} />
          <DetailItem label="Country" value={user.country || 'N/A'} />
          <DetailItem label="Address" value={user.address || 'N/A'} />

          {/* Support Text */}
          <Text style={styles.supportText}>
            To change any of your details please email us at support@nexus.com
          </Text>

          {/* BACK Button */}
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
            <Text style={styles.actionButtonText}>BACK</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  mainContentArea: {
    padding: spacing.containerPadding,
  },
  detailItem: {
    marginBottom: spacing.l,
  },
  detailLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.s,
  },
  detailBox: {
    backgroundColor: colors.inputBackground,
    borderRadius: borders.radiusMedium,
    paddingVertical: spacing.inputPaddingVertical,
    paddingHorizontal: spacing.inputPaddingHorizontal,
    justifyContent: 'center',
  },
  detailValue: {
    ...typography.body,
    color: colors.inputText,
  },
  actionButton: { 
    backgroundColor: '#1f2531', 
    paddingVertical: spacing.m,
    borderRadius: borders.radiusMedium,
    alignItems: 'center',
    marginTop: spacing.l, // Adjusted margin for the new text
  },
  actionButtonText: { 
    ...typography.button,
    color: colors.primaryButtonText,
  },
  supportText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.m,
  },
});

export default FulldetailsScreen;
