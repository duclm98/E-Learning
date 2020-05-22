import * as React from 'react';
import 'react-native-gesture-handler';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createCollapsibleStack } from 'react-navigation-collapsible';

import Introduction from './src/components/Introduction/Introduction';
import Home from './src/components/Main/Home/Home';
import Login from './src/components/Authentication/Login/Login';
import Register from './src/components/Authentication/Register/Register';
import ForgetPassword from './src/components/Authentication/ForgetPassword/ForgetPassword';
import VerifyPassword from './src/components/Authentication/ForgetPassword/VerifyPassword';
import ListCourses from './src/components/Courses/ListCourses/ListCourses';

const AuthContext = React.createContext();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return <Tab.Navigator>
    <Tab.Screen name='Home' component={Home}></Tab.Screen>
    <Tab.Screen name='ListCourses' component={ListCourses}></Tab.Screen>
  </Tab.Navigator>
}

const AnonymousStack = (props) => {
  const HandleLoginButton = () => {
    props.navigation.navigate('Login');
  }
  return <Stack.Navigator initialRouteName='Introduction'>
    <Stack.Screen name='Introduction' component={Introduction} initialParams={{authContext: AuthContext}} options={{title: 'Introduction', headerShown: false}}></Stack.Screen>
    <Stack.Screen name='Login' component={Login} initialParams={{authContext: AuthContext}} options={{title: 'Login', headerShown: false}}></Stack.Screen>
    <Stack.Screen name='Register' component={Register} options={{title: 'Register', headerShown: false}}></Stack.Screen>
    <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{title: 'Forget password', headerShown: false}}></Stack.Screen>
    <Stack.Screen name='VerifyPassword' component={VerifyPassword} options={{title: 'Verify password', headerShown: false}}></Stack.Screen>
    {createCollapsibleStack(
      <Stack.Screen name='Home' component={Home}
        options={{headerTitle:'',
                  headerLeft: ()=>(<Text></Text>),
                  headerRight: ()=>(
                    <TouchableOpacity onPress={HandleLoginButton}>
                      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', paddingRight: 20}}>SIGN IN</Text>
                    </TouchableOpacity>
                  )
                }}
      ></Stack.Screen>
    )}
    <Stack.Screen name="ListCourses" component={ListCourses} options={{title: 'List courses'}}></Stack.Screen>
  </Stack.Navigator>
}

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
              isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
              userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
              userToken: null,
          };
      }
    }, {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({
        type: 'RESTORE_TOKEN',
        token: userToken
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({
          type: 'SIGN_IN',
          token: 'dummy-auth-token'
        });
      },
      signOut: () => dispatch({
        type: 'SIGN_OUT'
      }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({
          type: 'SIGN_IN',
          token: 'dummy-auth-token'
        });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen name='Anonymous stack' component={AnonymousStack} options={{headerShown: false}}></Stack.Screen>
          ) : (
            <Stack.Screen name='Identified stack' component={MainTab} options={{headerShown: false}}></Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});