/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Button, Headline, TextInput, Avatar} from 'react-native-paper';
import * as firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        if (response) {
          setLoading(false);
          props.navigation.navigate('LoadingScreen');
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    } else {
      alert('Please input email and password.');
    }
  };
  const signUp = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        if (response) {
          setLoading(false);
          login();
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    } else {
      alert('Please input email and password.');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {loading ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              elevation: 1000,
            },
          ]}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : null}
      <View style={styles.header}>
        <Headline style={{fontSize: 30}}>InstAlert</Headline>
        <Avatar.Image size={70} source={require('../assets/alert.png')} />
      </View>

      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Input email"
          onChangeText={input => setEmail(input)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          placeholder="Input password"
          onChangeText={input => setPassword(input)}
        />
      </View>
      <View>
        <Button
          style={{marginBottom: 10}}
          icon="camera"
          mode="contained"
          onPress={() => login()}>
          Login
        </Button>
        <Button icon="camera" mode="outlined" onPress={() => signUp()}>
          Register
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 40,
    flex: 1,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  form: {
    marginBottom: 30,
  },
});
