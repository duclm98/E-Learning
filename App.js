import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Introduction from './src/components/Introduction/Introduction';
import Home from './src/components/Main/Home/Home';
import Login from './src/components/Authentication/Login/Login';
import Register from './src/components/Authentication/Register/Register';
import ForgetPassword from './src/components/Authentication/ForgetPassword/ForgetPassword';
import VerifyPassword from './src/components/Authentication/ForgetPassword/VerifyPassword';
import ListCourses from './src/components/Courses/ListCourses/ListCourses';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Introduction'>
        <Stack.Screen name='Introduction' component={Introduction} options={{title: 'Introduction', headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Login' component={Login} options={{title: 'Login', headerShown: false, headerTransparent:{position: 'absolute', backgroundColor: 'transparent'}}}></Stack.Screen>
        <Stack.Screen name='Register' component={Register} options={{title: 'Register', headerShown: false, headerTransparent:{position: 'absolute', backgroundColor: 'transparent'}}}></Stack.Screen>
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{title: 'Forget password', headerShown: false, headerTransparent:{position: 'absolute', backgroundColor: 'transparent'}}}></Stack.Screen>
        <Stack.Screen name='Home' component={Home} options={{title: 'Home'}}></Stack.Screen>
        <Stack.Screen name="ListCourses" component={ListCourses} options={{title: 'List courses'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    // <View style = {styles.container}>
    //   {/* <Introduction></Introduction> */}
    //   {/* <Login></Login> */}
    //   {/* <Register></Register> */}
    //   {/* <ForgetPassword></ForgetPassword> */}
    //   {/* <VerifyPassword></VerifyPassword> */}
    //   {/* <Home></Home> */}
    //   {/* <ListCourses></ListCourses> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});