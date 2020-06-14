import MainComponent from './src/components';
import React, { useState, useEffect, createContext } from 'react';
import { AsyncStorage } from 'react-native'

console.disableYellowBox = true;

import { USER_TOKEN } from './src/globals/constants';
import { themesList, coursesList, courseDetail } from './src/globals/variables';

export const MainContext = createContext();

export default function App() {
  const [theme, setTheme] = useState(themesList.light);
  const [courses, setCourses] = useState(coursesList);
  const [listCoursesData, setListCoursesData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [account, setAccount] = useState();
  const [accountToken, setAccountToken] = useState();

  const dataContext = {
    setAccount,
    accountToken, setAccountToken,
    courses,
    listCoursesData, setListCoursesData,
    courseDetail,
    wishlist, setWishlist
  }

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      setAccountToken(token);
    }
    fetchData();
  },[]);

  useEffect(() => {
    async function fetchData() {
      if(account){
        await AsyncStorage.setItem(USER_TOKEN, JSON.stringify(account));
        setAccountToken(JSON.stringify(account));
      }
    }
    fetchData();
  }, [account]);

  return (
    <MainContext.Provider value = {dataContext}>
        <MainComponent accountToken = {accountToken}></MainComponent>
    </MainContext.Provider>
  );
}