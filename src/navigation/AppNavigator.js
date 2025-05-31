import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile.jsx';
import Wallet from '../screens/Wallet.jsx'; // Import the new Wallet screen
import Send from '../screens/Send.jsx'; // Import the new Wallet screen
import Confirm from '../screens/Confirm.jsx'; // Import the new Confirm screen
import Sent from '../screens/Sent.jsx'; // Import the new Confirm screen
import History from '../screens/History.jsx'; // Import the new Confirm screen
import Exchange from '../screens/Exchange.jsx'; // Import the new Confirm screen
import Help from '../screens/Help.jsx'; // Import the new Confirm screen
import Fulldetails from '../screens/Fulldetails.jsx'; // Import the new Confirm screen
import Reset from '../screens/Reset.jsx'; // Import the new Reset screen
import Resetdone from '../screens/Resetdone.jsx'; // Import the new Resetdone screen

const Stack = createStackNavigator();

function AppNavigator() 
{
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animationEnabled: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Wallet" component={Wallet} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="Send" component={Send} />
			<Stack.Screen name="Confirm" component={Confirm} />
			<Stack.Screen name="Sent" component={Sent} />
			<Stack.Screen name="History" component={History} />
			<Stack.Screen name="Exchange" component={Exchange} />
			<Stack.Screen name="Help" component={Help} />
			<Stack.Screen name="Fulldetails" component={Fulldetails} />
			<Stack.Screen name="Reset" component={Reset} />
			<Stack.Screen name="Resetdone" component={Resetdone} />
		</Stack.Navigator>
	);
}

export default AppNavigator;