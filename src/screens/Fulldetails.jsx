import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ScreenHeader from '../components/ScreenHeader.jsx';
import ProfileIcon from '../assets/ProfileIcon.jsx'; // Re-using ProfileIcon, or create a new one
import BottomNavBar from '../components/BottomNavBar.jsx';
import { colors, typography, spacing, borders, commonStyles } from '../theme/theme';

const FulldetailsScreen = ({ navigation }) => {
  // Placeholder data - In a real app, this would come from state/props/API
  const userDetails = {
    accountName: "Andre Combrinck",
    fullName: "Andre Combrinck",
    surname: "Combrinck",
    emailAddress: "andre.combrinck@example.com",
    confirmEmail: "andre.combrinck@example.com", // Usually not displayed, but was in Register.jsx
    country: "South Africa",
    address: "123 Nexus Street, Walletville, WC 12345",
  };

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
          <DetailItem label="Account name" value={userDetails.accountName} />
          <DetailItem label="Full name" value={userDetails.fullName} />
          <DetailItem label="Surname" value={userDetails.surname} />
          <DetailItem label="Email address" value={userDetails.emailAddress} />
          {/* <DetailItem label="Confirm email" value={userDetails.confirmEmail} /> */}
          <DetailItem label="Country" value={userDetails.country} />
          <DetailItem label="Address" value={userDetails.address} />

          {/* Back to Profile Link */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLinkContainer}>
            <Text style={styles.backLinkText}>Back to Profile</Text>
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
    // minHeight: 48, // Ensure a consistent tap target height if these become editable
    justifyContent: 'center',
  },
  detailValue: {
    ...typography.body,
    color: colors.inputText,
  },
  backLinkContainer: {
    marginTop: spacing.xl,
    alignItems: 'center', // Center the link
  },
  backLinkText: {
    ...typography.link,
    color: colors.primary, // Changed to match 'View/Edit full account details' link
    textDecorationLine: 'underline',
  },
});

export default FulldetailsScreen;