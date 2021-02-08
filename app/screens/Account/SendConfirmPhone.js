import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import  { Button, Icon } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

export default function SendConfirmPhone() {
  const [country, setCountry] = useState('MX')
  const [callingCode, setCallingCode] = useState('52')
  const [phone, setPhone] = useState('')
  return (
    <View style={styles.container}>
      <Image  
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />
      <View  style={styles.panel}>
        <View style={{
          borderBottomColor: '#25D366',
          borderBottomWidth: 2,
          width: 100,
        }} />
        <View style={styles.innerPanel}>
          <Icon 
            name='whatsapp'
            type='material-community'
            size= {100}
            color= '#25D366'
          />
          <Text style={styles.title}> Ingresa tu número de whatsapp</Text>
          <View style={styles.phoneView}>
            <CountryPicker 
              withFilter
              withCallingCode
              withFilter
              withCallingCodeButton
              countryCode={country}
              onSelect={ Country => {
                setCountry(Country.cca2)
                setCallingCode(...Country.callingCode)
              } }
            />
            <Text style={{ color: '#fff'}}> | </Text>
            <TextInput 
              placeholder='Número de Whatsapp'
              style={styles.input}
              placeholderTextColor= '#fff'
              onChangeText={ text => setPhone(text)}
              value={phone}
            />
          </View>
          <Button 
            title='Confirmar Número'
            buttonStyle={{backgroundColor: '#25D366'}}
            containerStyle={{marginHorizontal: 20}}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#128C7E'
  },
  logo: {
    width: 106,
    height: 106,
    alignSelf: 'center',
    marginVertical: 40
  },
  panel: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center'

  },
  innerPanel: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 20
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#25D366',
    fontWeight: 'bold'
  },
  phoneView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    marginHorizontal: 20,
    backgroundColor: 'rgba(37,111,106,0.6)',

  },
  input: {
    width: '80%',
    height: 50,
    marginLeft: 5
  }
})