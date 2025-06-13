import 'react-native-get-random-values'; // Needs to be at the very top
import React, { useRef } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { AppSettingsProvider } from './src/context/AppSettingsContext';

const App = () =>
{
	const navigationRef = useRef();

  return (
    <AuthProvider>
      <AppSettingsProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </AppSettingsProvider>
    </AuthProvider>
  );
};

export default App;
