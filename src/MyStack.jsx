// src/MyStack.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';
import EmergencyCommunicationScreen from './screens/EmergencyCommunicationScreen';
import EmergencyContactScreen from './screens/EmergencyContactScreen';
import HomeScreen from './screens/HomeScreen';
import LocationSharingScreen from './screens/LocationSharingScreen';
import NotFoundScreen from './screens/NotFoundScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="EmergencyCommunication" component={EmergencyCommunicationScreen} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
        <Stack.Screen name="LocationSharing" component={LocationSharingScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Screen name="LOGIN" component={AuthScreen} />
        <Stack.Screen name="SIGNUP" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;