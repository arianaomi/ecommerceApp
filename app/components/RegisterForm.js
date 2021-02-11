import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import  { Icon, Input, Button } from 'react-native-elements'
import { useNavigation} from '@react-navigation/native'
import { isEmpty, size } from 'lodash'
import * as firebase from 'firebase'
// utils 
import  { validationEmail }  from '../utils/validationEmail'
// My components 
import Loading from './Loading'

export default function RegisterForm({toastRef}) {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showIcon, setShowIcon] = useState (true)
  const [showIconConfirm, setShowIconConfirm] = useState (true)
  const [loading, setLoading] =  useState(false)

  const createAccount = () => {
    if(isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
      toastRef.current.show("Todos los campos son obligatorios")
    } else if (!validationEmail(email)) {
      toastRef.current.show("Correo invalido")
    }else if( password !== confirmPassword){
      toastRef.current.show("Las contraseñas deben ser iguales")
    } else if( size(password) < 6){
      toastRef.current.show("Las contraseñas deben tener al menos 6 caracteres")
    }else {
      setLoading(true)
     firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=> {
        console.log('todo bien')
        toastRef.current.show("Usuario creado")
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        toastRef.current.show("Upps algo salio mal")
      })
    }
  }

  return (
    <View style={styles.container}>
      <View  style={{ 
        borderBottomColor:'#25D366',
        borderBottomWidth: 2,
        width: 100
      }}/>
      <Input 
        placeholder='correo'
        containerStyle={styles.input}
        value={email}
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#128C7E',
          onPress: () => alert('hola')

        }}
        leftIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          color: '#128C7E',
        }}
        onChangeText={text => setEmail(text)}
      />
      <Input  
        placeholder='Contraseña'
        containerStyle={styles.input}
        secureTextEntry ={ showIcon? true: false}
        value={password}
        leftIcon={{
          type: 'material-community',
          name: 'security',
          color: '#128C7E',
        }}
        rightIcon={{
          type: 'material-community',
          name: !showIcon? 'eye-off-outline':'eye-outline',
          color: '#128C7E',
          onPress: () => setShowIcon(!showIcon)

        }}
        onChangeText={text => setPassword(text)}
      />
      <Input  
        placeholder='Repetir contraseña'
        containerStyle={styles.input}
        secureTextEntry={ showIconConfirm? true : false}
        value={confirmPassword}
        leftIcon={{
          type: 'material-community',
          name: 'security',
          color: '#128C7E',
        }}
        rightIcon={{
          type: 'material-community',
          name: !showIconConfirm? 'eye-off-outline':'eye-outline',
          color: '#128C7E',
          onPress: () => setShowIconConfirm(!showIconConfirm)

        }}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button 
        title='Crear cuenta'
        containerStyle={styles.registerBtn} 
        buttonStyle={{backgroundColor: '#25D366'}}
        onPress={createAccount}
      />
      <Button 
        title='Iniciar sesión'
        containerStyle={styles.registerBtn} 
        buttonStyle={{backgroundColor: '#128C7E'}}
        onPress={()=> navigation.goBack()}
      />

      { loading && <Loading text ='Creando Cuenta' isVisible />}

      
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#F5F6F8',
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingTop: 20
  },
  input: {
    width: '90%',
    marginTop: 20,
    height: 50
  },
  registerBtn: {
    width: '90%',
    marginTop: 20
  },
  createAccount: {
    marginTop: 20
  },
  account: {
    color: '#128C7E',
    fontSize: 15
  }
})