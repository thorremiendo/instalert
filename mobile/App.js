import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppNavigator from './screens/Navigator';
import {Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './screens/MainNavigator';
export default function App() {
  const RootStack = createStackNavigator();

  const [user, setUser] = useState('');

  useEffect(() => {
    validateLogin();
  });

  const validateLogin = () => {
    auth().onAuthStateChanged(user => {
      setUser(user);
    });
  };
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!user ? (
            <RootStack.Screen name={'AuthStack'} component={AppNavigator} />
          ) : (
            <RootStack.Screen name={'HomeStack'} component={MainNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
