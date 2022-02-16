/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Headline, TextInput, Avatar} from 'react-native-paper';

export default function LoginScreen(props) {
  const login = () => props.navigation.navigate('UserHomeScreen');
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}>
        <Headline style={{fontSize: 30}}>InstAlert</Headline>
        <Avatar.Image size={70} source={require('../assets/alert.png')} />
      </View>

      <View>
        <TextInput
          mode="outlined"
          label="Username"
          placeholder="Input username"
        />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          placeholder="Input password"
        />
      </View>

      <Button icon="camera" mode="contained" onPress={login}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 40,
    flex: 1,
  },
});
