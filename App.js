import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Main/Home/Home';
import Login from './src/components/Authentication/Login/Login';
import Register from './src/components/Authentication/Register/Register';

export default function App() {
  return (
    <View style = {styles.container}>
      {/* <Home></Home> */}
      {/* <Login></Login> */}
      <Register></Register>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});