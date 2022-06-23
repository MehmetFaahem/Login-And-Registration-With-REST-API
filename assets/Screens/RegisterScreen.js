import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({navigation}){

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const BASE_URL = 'http://restapi.adequateshop.com';
  const [userInfo, setUserInfo] = useState({});

  const register = (name, email, password) => {
    

    axios
      .post(`${BASE_URL}/api/authaccount/registration`, {name, email,
        password
      })
      .then(res => {
        let userInfo = res.data
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        
      });
  };

  return(
    <View style={styles.container}>
      <View style={{
        marginTop: 30
      }}>
        <Text style={{
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>Register</Text>
      </View>
      <View style={{
        alignSelf: 'center',
        paddingTop: 20
      }}>
        <Image source={require('../Images/loginn.png')} style={{
          height: 110,
          width: 110
        }}/>
      </View>
      <Text style={{
        fontSize: 12,
        color: 'white',
        marginTop: 17
      }}>Name</Text>
      <View style={{
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 10
      }}>
        <TextInput placeholder='Name' style={{
          fontSize: 16,
          fontWeight: 'bold',
          padding: 10,
          color: 'white'
        }}  placeholderTextColor='#5b615d' onChangeText={text => setName(text)}/>
      </View>
      <Text style={{
        fontSize: 12,
        color: 'white',
        marginTop: 17
      }}>Email</Text>
      <View style={{
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 10
      }}>
        <TextInput placeholder='Email' style={{
          fontSize: 16,
          fontWeight: 'bold',
          padding: 10,
          color: 'white'
        }}  placeholderTextColor='#5b615d' onChangeText={text => setEmail(text)}/>
      </View>
      <Text style={{
        fontSize: 12,
        color: 'white',
        marginTop: 17
      }}>Password</Text>
      <View style={{
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 10
      }}>
        <TextInput placeholder='Password' style={{
          fontSize: 16,
          fontWeight: 'bold',
          padding: 10,
          color: 'white'
        }} secureTextEntry placeholderTextColor='#5b615d' onChangeText={text => setPassword(text)}/>
      </View>
      <View>
        <TouchableOpacity onPress={() => {
            register(name, email, password);
          }}>
          <View style={{
            backgroundColor: '#134370',
            marginTop: 20,
            paddingVertical: 8
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: 'center',
              color: 'white'
            }}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{
        flexDirection: 'row',
        marginTop: 20
      }}>
        <Text style={{
          color: 'white',
          marginRight: 10
        }}>Already created !</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={{
            color: '#61a7e8'
          }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#161717',
    paddingHorizontal: 20
  }
})