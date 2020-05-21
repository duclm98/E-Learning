import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Main/Home/Home';
import Login from './src/components/Authentication/Login/Login';
import Register from './src/components/Authentication/Register/Register';
import ForgetPassword from './src/components/Authentication/ForgetPassword/ForgetPassword';
import VerifyPassword from './src/components/Authentication/ForgetPassword/VerifyPassword';
import ListCourses from './src/components/Courses/ListCourses/ListCourses';
import Introduction from './src/components/Introduction/Introduction';

export default function App() {
  return (
    <View style = {styles.container}>
      <Introduction></Introduction>
      {/* <Login></Login> */}
      {/* <Register></Register> */}
      {/* <ForgetPassword></ForgetPassword> */}
      {/* <VerifyPassword></VerifyPassword> */}
      {/* <Home></Home> */}
      {/* <ListCourses></ListCourses> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});