export const colors = {
  background: '#000000',
  surface: '#101010', // For cards like in Confirm.jsx
  primary: '#6482A4', // An even softer, desaturated blue (greyish-blue)

  primaryButtonBackground: '#6482A4', // Using the new, even more subtle primary
  primaryButtonText: '#FFFFFF',

  secondaryButtonBackground: '#2C2C2E', // Darker grey for secondary actions
  secondaryButtonText: '#FFFFFF',

  textPrimary: '#FFFFFF',
  textSecondary: '#AEAEB2', // Softer white/grey for less emphasis
  textPlaceholder: '#8E8E93', // For input placeholders

  inputBackground: '#1C1C1E', // Dark input background
  inputText: '#FFFFFF',
  inputBorder: '#3A3A3C', // Slightly visible border for dark inputs

  disabled: '#4A4A4A',
  disabledText: '#8E8E93',

  border: '#333333', // General border color
  error: '#D3756B', // A more muted, dusty rose/brick red
  success: '#34C759', // Standard green for success
  errorBackground: '#2D1B1A', // A dark, muted red background for error messages
  
  iconDefault: '#FFFFFF',

  bottomNavBarBackground: '#0A0A0A',
  bottomNavBarIconActive: '#6482A4', // Using the new, even more subtle primary
  bottomNavBarIconInactive: '#8E8E93',
};

export const typography = {
  // Consider adding custom font families if you have them
  // fontFamilyRegular: 'YourAppFont-Regular',
  // fontFamilyBold: 'YourAppFont-Bold',

  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary, // Use textSecondary for labels
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    // textDecorationLine: 'underline', // Optional for links
  }
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  containerPadding: 20,
  headerPaddingHorizontal: 15,
  headerPaddingVertical: 15,
  inputPaddingVertical: 12,
  inputPaddingHorizontal: 15,
};

export const borders = {
  radiusSmall: 4,
  radiusMedium: 8,
  borderWidth: 1,
  borderColor: colors.border,
  inputBorderColor: colors.inputBorder,
};

export const commonStyles = {
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Add other common styles like screen containers if needed
};