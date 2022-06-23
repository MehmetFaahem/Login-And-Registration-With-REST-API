import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home(){

  const data = [
  {
    label: 'Osman'
  },
  {
    label: 'Orhan'
  },
  {
    label: 'Murad'
  },
  {
    label: 'Bayezid'
  }
];

  const [option, setOption] = useState()

  return(
    <View style={styles.container}>
      <View style={{
        paddingTop: 30
      }}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 20,
          color: 'white'
        }}>Who was the fisrt emperor of Ottomans?</Text>
        <RadioButtonRN
        data={data}
        selectedBtn={(value) => setOption(value)}
        icon={
          <Icon
            name="check-circle"
            size={25}
            color="#2c9dd1"
          />
        }
        boxStyle={{backgroundColor: 'black'}}
        textStyle={{color: 'white', fontWeight: 'bold'}}
      />
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