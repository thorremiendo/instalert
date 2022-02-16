import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import UserScreen from './UserScreen';

const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none" initialRouteName="Login">
        <Screen name="Login" component={LoginScreen}></Screen>
        <Screen name="UserScreen" component={UserScreen}></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
