import MainComponent from './src/components';
import React, { useState, useEffect, useMemo, useReducer, createContext } from 'react';
import { AsyncStorage } from 'react-native'

import { login } from './src/core/Services/AuthenticationServices';

import * as constant from './src/globals/constants';
import { themesList, coursesList } from './src/globals/variables';

export const context = createContext();
export default function App() {
  const [theme, setTheme] = useState(themesList.light);
  const [courses, setCourses] = useState(coursesList);
  const [errStrFailedLogin, setErrStrFailedLogin] = useState('');
  const [state, dispatch] = useReducer(
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

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem(constant.STORAGE_KEY, userToken);
        console.log('token: ' + userToken);
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

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        const statusLogin = login(data.username, data.password);
        if (statusLogin.status === 200) {
          let userToken = 'dummy-auth-token';
          await AsyncStorage.setItem(constant.STORAGE_KEY, userToken);
          dispatch({
            type: 'SIGN_IN',
            token: userToken
          });
        } else{
          setErrStrFailedLogin(statusLogin.errStr);
        }
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
    <context.Provider value = {{ authContext, errStrFailedLogin, courses}}>
        <MainComponent userToken = {state.userToken}></MainComponent>
    </context.Provider>
  );
}