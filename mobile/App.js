import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './screens/Navigator';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
