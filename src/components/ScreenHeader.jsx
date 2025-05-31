import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import NexusLogoAsset from '../assets/nexus_logo.png'; // Renamed for clarity
import { colors, typography, spacing, borders } from '../theme/theme';

const ScreenHeader = ({ title, RightIconComponent, showBorder = true }) => {
  return (
    <View style={[
      styles.headerContainer,
      showBorder ? styles.headerBorder : {}
    ]}>
      <Image source={NexusLogoAsset} style={styles.logo} />
      <Text style={styles.headerTitleStyle}>{title}</Text>
      {RightIconComponent ? (
        <RightIconComponent width={28} height={28} color={colors.iconDefault} />
      ) : (
        <View style={styles.iconPlaceholder} /> // Ensures layout consistency
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.headerPaddingHorizontal,
    paddingTop: spacing.headerPaddingVertical,
    paddingBottom: spacing.s,
    backgroundColor: colors.background,
  },
  headerBorder: {
    borderBottomWidth: borders.borderWidth,
    borderBottomColor: colors.border,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerTitleStyle: { // Renamed to avoid conflict with typography.headerTitle
    ...typography.headerTitle,
  },
  iconPlaceholder: {
    width: 28, // Match icon dimensions
    height: 28,
  },
});

export default ScreenHeader;