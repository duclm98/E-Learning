import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Main/Home/Home';

export default function App() {
  return (
    <View style = {styles.container}>
      <Home></Home>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
