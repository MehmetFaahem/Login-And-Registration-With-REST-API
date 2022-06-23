import React, {useState, createContext} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { Entypo } from '@expo/vector-icons';
const AuthContext = createContext();

export default function Login({navigation, children}){

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const BASE_URL = 'http://restapi.adequateshop.com';
  const [userInfo, setUserInfo] = useState({});

  const [isModalVisible, setModalVisible] = useState(false);
  const [isNegModalVisible, setNegModalVisible] = useState(false);


  const login = (email, password) => {
    

    axios
      .post(`${BASE_URL}/api/authaccount/login`, {email,
        password
      })
      .then(res => {
        let userInfo = res.data
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
        console.log(userInfo);

        res.data.message === 'success' ? 
        setModalVisible(!isModalVisible) : setNegModalVisible(!isNegModalVisible)
        
      })
      .catch(e => {
        console.log(`login error ${e}`);
        
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
      }}>Login To Join Our Community</Text>
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
            login(email, password);
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
            }}>Login</Text>
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
        }}>Account is'nt created yet !</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
          <Text style={{
            color: '#61a7e8'
          }}>Register</Text>
        </TouchableOpacity>
      </View>
      <AuthContext.Provider
      value={{
        userInfo
      }}>
      {children}
    </AuthContext.Provider>
      <Modal isVisible={isModalVisible} backdropOpacity='0.93'>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{
            flexDirection: 'column'
          }}>
            <Entypo name="emoji-happy" size={90} color="#134370" style={{alignSelf: 'center'}}/>
            <Text style={{
            fontSize: 40,
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: "bold",
            color: 'white',
            padding: 10
          }}>Congrats !</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
            <View style={{
              backgroundColor: '#134370',
              marginTop: 20
            }}>
              <Text style={{
                color: 'white',
                padding: 20,
                alignSelf: 'center',
                fontSize: 35,
                fontWeight: "bold"
              }}>Go Now!</Text>
            </View>
          </TouchableOpacity>
          
        </View>
      </Modal>
      <Modal isVisible={isNegModalVisible} backdropOpacity='0.93'>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{
            flexDirection: 'column'
          }}>
            <Entypo name="emoji-sad" size={90} color="#134370" style={{alignSelf: 'center'}}/>
            <Text style={{
            fontSize: 40,
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: "bold",
            color: 'white',
            padding: 10
          }}>Sorry, Anything Can Be Wrong!</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
            <View style={{
              backgroundColor: '#134370',
              marginTop: 20
            }}>
              <Text style={{
                color: 'white',
                padding: 20,
                alignSelf: 'center',
                fontSize: 35,
                fontWeight: "bold"
              }}>Try Again!</Text>
            </View>
          </TouchableOpacity>
          
        </View>
      </Modal>
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