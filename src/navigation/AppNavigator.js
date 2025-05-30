import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile.jsx';
import Wallet from '../screens/Wallet.jsx'; // Import the new Wallet screen
import Send from '../screens/Send.jsx'; // Import the new Wallet screen
import Confirm from '../screens/Confirm.jsx'; // Import the new Confirm screen

const Stack = createStackNavigator();

function AppNavigator() 
{
	return (
		<Stack.Navigator initialRouteName="Confirm" screenOptions={{ headerShown: false, animationEnabled: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Wallet" component={Wallet} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="Send" component={Send} />
			<Stack.Screen name="Confirm" component={Confirm} />
		</Stack.Navigator>
	);
}

export default AppNavigator;