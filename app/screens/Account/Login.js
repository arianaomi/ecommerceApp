
import React, { useRef } from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import Toast from 'react-native-easy-toast'
// My components
import LoginForm from '../../components/LoginForm'

export default function Login () {
  const toastRef = useRef()
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#128C7E' />
      <Image  
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.titleBanner}> Bienvenidos </Text>
      <LoginForm toastRef={toastRef}/>
      <Toast ref={toastRef} position='center' opacity={0.9} />
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#128C7E',
    },
    logo: {
      width: 106,
      height: 106,
      marginTop: 40,
      alignSelf: 'center'
    },
    titleBanner: {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#fff',
      alignSelf: 'center'
    }

  }
)