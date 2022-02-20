/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import * as firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const LoadingScreen = props => {
  useEffect(() => {
    validateLogin();
  });

  const validateLogin = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('UserHomeScreen', {user});
      } else {
        props.navigation.navigate('Login', {user});
      }
    });
  };
  return (
    <View>
      <Text>LoadingScreen</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
