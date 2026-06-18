import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { IssueProvider } from './src/context/IssueContext';

export default function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </IssueProvider>
    </AuthProvider>
  );
}