import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Main/Home/Home';
import Login from './src/components/Authentication/Login/Login';

export default function App() {
  return (
    <View style = {styles.container}>
      {/* <Home></Home> */}
      <Login></Login>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});