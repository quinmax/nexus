import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Login from '../screens/Login';
import Register from '../screens/Register';
import Blank from '../screens/Blank.jsx';
import Profile from '../screens/Profile.jsx';
import Wallet from '../screens/Wallet.jsx'; // Import the new Wallet screen


const Stack = createStackNavigator();

function AppNavigator() 
{
	return (
		<Stack.Navigator initialRouteName="Wallet" screenOptions={{ headerShown: false, animationEnabled: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Blank" component={Blank} />
			<Stack.Screen name="Wallet" component={Wallet} />
			<Stack.Screen name="Profile" component={Profile} />
		</Stack.Navigator>
	);
}

export default AppNavigator;