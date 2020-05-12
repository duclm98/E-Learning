import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Main/Home/Home';
import Login from './src/components/Authentication/Login/Login';
import Register from './src/components/Authentication/Register/Register';
import ForgetPassword from './src/components/Authentication/ForgetPassword/ForgetPassword';
import VerifyPassword from './src/components/Authentication/ForgetPassword/VerifyPassword';

export default function App() {
  return (
    <View style = {styles.container}>
      {/* <Home></Home> */}
      {/* <Login></Login> */}
      {/* <Register></Register> */}
      {/* <ForgetPassword></ForgetPassword> */}
      <VerifyPassword></VerifyPassword>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});