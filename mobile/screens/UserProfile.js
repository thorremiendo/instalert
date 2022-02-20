import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {Button, Headline, TextInput, Avatar} from 'react-native-paper';

const UserProfile = props => {
  const logout = async () => {
    try {
      await auth().signOut();
      props.navigation.navigate('LoginScreen');
    } catch (error) {
      alert('Unable to logout. Please try again later.');
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        style={{marginTop: 20}}
        icon="camera"
        mode="outline"
        onPress={logout}>
        Logout
      </Button>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
