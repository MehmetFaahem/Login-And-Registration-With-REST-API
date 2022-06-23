import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../assets/Screens/HomeScreen'
import Login from '../assets/Screens/LoginScreen'
import Register from '../assets/Screens/RegisterScreen'

const Stack = createNativeStackNavigator()

const BASE_URL = 'http://restapi.adequateshop.com';


export default function Navigation(email, password) {

  const [userInfo, setUserInfo] = useState({});

  axios
      .post(`${BASE_URL}/api/authaccount/login`, {email,
        password
      })
      .then(res => {
        let userInfo = res.data
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        
      });


  return (
    <NavigationContainer>
      <Stack.Navigator>

          
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
          <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}