import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Headline, TextInput, Avatar} from 'react-native-paper';

const UserHomeScreen = props => {
  const mapAlert = () => props.navigation.navigate('UserScreen');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button icon="camera" mode="contained" onPress={mapAlert}>
        Emergency
      </Button>
    </View>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({});
