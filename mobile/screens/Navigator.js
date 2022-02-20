import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';

const AppNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen}></AuthStack.Screen>
      <AuthStack.Screen
        name="LoadingScreen"
        component={LoadingScreen}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AppNavigator;
