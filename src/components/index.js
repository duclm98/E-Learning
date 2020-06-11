import React from 'react';
import 'react-native-gesture-handler';
import { Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createCollapsibleStack } from 'react-navigation-collapsible';
import { Ionicons } from '@expo/vector-icons';

import Introduction from './Introduction/Introduction';
import Login from './Authentication/Login/Login';
import Register from './Authentication/Register/Register';
import ForgetPassword from './Authentication/ForgetPassword/ForgetPassword';
import VerifyPassword from './Authentication/ForgetPassword/VerifyPassword';
import Home from './Main/Home/Home';
import Search from './Main/Search/Search';
import MyCourses from './Main/MyCourses/MyCourses';
import Wishlist from './Main/Wishlist/Wishlist';
import Account from './Main/Account/Account'
import ListCourses from './Courses/ListCourses/ListCourses';

const MainComponent = ({userToken}) => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const stackOptions = {
    headerStyle: {
      backgroundColor: '#EB4848',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  }

  const HomeStack = (props) => {
    let title = '';
    if (props.route.state) {
      if (props.route.state.routes.length > 1) {
        title = props.route.state.routes[1].params.title
      }
    }

    const headerRightHomeButton = props.route.params.headerRightHomeButton;
    const headerRightButton = props.route.params.headerRightButton;

    return <Stack.Navigator initialRouteName='Home'>
      {createCollapsibleStack(
        <Stack.Screen name='Home' component={Home}
          options={{headerTitle:'',
                    headerLeft: ()=>(<Text></Text>),
                    headerRight: ()=>(
                      headerRightHomeButton
                    )
                  }}
        ></Stack.Screen>
      )}
      {/* <Stack.Screen name='Home' component={Home}
        options={{headerTitle:'',
                  headerLeft: ()=>(<Text></Text>),
                  headerRight: ()=>(
                    headerRightHomeButton
                  )
                }}
      ></Stack.Screen> */}
      <Stack.Screen name="ListCourses" component={ListCourses}
        options={{title: title, ...stackOptions,
                  headerRight: ()=>(
                    headerRightButton
                  )
                }}
      ></Stack.Screen>
    </Stack.Navigator>
  }

  const SearchStack = (props) => {
    const searchView = <View style={{flexDirection: 'row', margin: 5}}>
                          <TextInput placeholder='Search text'
                            style = {{
                              flex: 1,
                              borderColor: 'gray',
                              borderWidth: 1,
                              paddingLeft: 10,
                              borderTopLeftRadius: 10,
                              borderBottomLeftRadius: 10,
                            }}
                          ></TextInput>
                          <Button title='Search' style={{width: 40, height: 60}}></Button>
                      </View>

    const headerRightButton = props.route.params.headerRightButton;

    return <Stack.Navigator>
      <Stack.Screen name='Search' component={Search}
            options={{...stackOptions,
                      headerTitle: ()=>(
                        searchView
                      ),
                      headerRight: ()=>(
                        headerRightButton
                      )
                    }}
      ></Stack.Screen>
    </Stack.Navigator>
  }

  const MyCoursesStack = (props) => {
    const headerRightButton = props.route.params.headerRightButton;
    return <Stack.Navigator>
      <Stack.Screen name='MyCourses' component={MyCourses}
            options={{
                      title: 'All courses', ...stackOptions,
                      headerRight: ()=>(
                        headerRightButton
                      )
                    }}
      ></Stack.Screen>
    </Stack.Navigator>
  }

  const WishlistStack = (props) => {
    const headerRightButton = props.route.params.headerRightButton;
    return <Stack.Navigator>
      <Stack.Screen name='Wishlist' component={Wishlist}
            options={{
              title: 'Wishlist',
              ...stackOptions,
              headerRight: ()=>(
                headerRightButton
              )
            }}
      ></Stack.Screen>
    </Stack.Navigator>
  }

  const AccountStack = (props) => {
    const headerRightButton = props.route.params.headerRightButton;
    return <Stack.Navigator>
      <Stack.Screen name='Account' component={Account}
            options={{
              title: 'Account', ...stackOptions,
              headerRight: ()=>(
                headerRightButton
              )
            }}
      ></Stack.Screen>
    </Stack.Navigator>
  }

  const MainTab = (props) => {
    const isAuth = props.route.params.isAuth;

    const headerRightButton = <TouchableOpacity>
                                {isAuth ? (
                                  <Ionicons style={{paddingRight: 20}} name='md-cart' size={30} color='white'/>
                                ) : (null)}
                              </TouchableOpacity>

    const headerRightHomeButton = <TouchableOpacity>
                                    {!isAuth ? (
                                      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black', paddingRight: 20}}>SIGN IN</Text>
                                    ) : (
                                      <Ionicons style={{paddingRight: 20}} name='md-cart' size={30} color='red' />
                                    )}
                                  </TouchableOpacity>

    return <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'md-home' : 'ios-home';
          } else if (route.name === 'SearchStack') {
            iconName = focused ? 'md-search' : 'ios-search';
          } else if (route.name === 'MyCoursesStack') {
            iconName = focused ? 'md-list' : 'ios-list';
          } else if (route.name === 'WishlistStack') {
            iconName = focused ? 'md-heart' : 'ios-heart';
          } else if (route.name === 'AccountStack') {
            iconName = focused ? 'md-person' : 'ios-person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#EB4848',
        inactiveTintColor: 'white',
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        },
        style: {
          backgroundColor: 'darkslategrey'
        }
      }}>
      <Tab.Screen name="HomeStack" component={HomeStack} initialParams={{headerRightHomeButton, headerRightButton}} options={{title: 'Home'}}></Tab.Screen>
      <Tab.Screen name="SearchStack" component={SearchStack} initialParams={{headerRightButton}} options={{title: 'Search'}}></Tab.Screen>
      <Tab.Screen name="MyCoursesStack" component={MyCoursesStack} initialParams={{headerRightButton}} options={{title: 'My courses'}}></Tab.Screen>
      <Tab.Screen name="WishlistStack" component={WishlistStack} initialParams={{headerRightButton}} options={{title: 'Wishlist'}}></Tab.Screen>
      <Tab.Screen name="AccountStack" component={AccountStack} initialParams={{headerRightButton}} options={{title: 'Account'}}></Tab.Screen>
    </Tab.Navigator>
  }

  const AnonymousStack = (props) => {
    return <Stack.Navigator initialRouteName='Introduction'>
      <Stack.Screen name='Introduction' component={Introduction} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name='Login' component={Login} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name='Register' component={Register} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name='VerifyPassword' component={VerifyPassword} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name='MainTab' component={MainTab} initialParams={{isAuth: false}} options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  }

  const IdentifiedStack = (props) => {
    return <Stack.Navigator>
      <Stack.Screen name='MainTab' component={MainTab} initialParams={{isAuth: true}} options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  }

  return(
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <Stack.Screen name='AnonymousStack' component={AnonymousStack} options={{headerShown: false}}></Stack.Screen>
        ) : (
          <Stack.Screen name='IdentifiedStack' component={IdentifiedStack} options={{headerShown: false}}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainComponent;