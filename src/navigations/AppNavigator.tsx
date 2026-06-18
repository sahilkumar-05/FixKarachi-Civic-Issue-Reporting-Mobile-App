import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabs from './BottomTabs';
import AdminScreen from '../screens/AdminScreen';
import IssueDetailsScreen from '../screens/IssueDetailsScreen';

import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth(); // 👈 IMPORTANT

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {user ? (
        // 🔥 LOGGED IN STACK
        <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="IssueDetails" component={IssueDetailsScreen} />
        </>
      ) : (
        // 🔥 AUTH STACK
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}

    </Stack.Navigator>
  );
}