import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import  { Icon, Input, Button, Divider } from 'react-native-elements'
import { useNavigation} from '@react-navigation/native'
import { isEmpty } from 'lodash'
import * as firebase from 'firebase'
// utils 
import  { validationEmail }  from '../utils/validationEmail'
import { loginValidation } from '../utils/actions'

export default function LoginForm({toastRef}) {

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')

  loginValidation()

  const loginValidations = () => {
    if(isEmpty(email) || isEmpty(password)) {
      toastRef.current.show("Debe ingresar los valores de email y password")
    } else if (!validationEmail(email)) {
      toastRef.current.show("Correo invalido")
    }else {
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(()=> {
        console.log('todo bien')
      })
      .catch(error => {
        console.log(error)
        toastRef.current.show("Email o cantraseña incorrectas")
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
        placeholder='contraseña'
        containerStyle={styles.input}
        secureTextEntry
        value={password}
        leftIcon={{
          type: 'material-community',
          name: 'security',
          color: '#128C7E',
        }}
        rightIcon={{
          type: 'material-community',
          name: 'eye-outline',
          color: '#128C7E',
          onPress: () => alert('hola')

        }}
        onChangeText={text => setPassword(text)}
      />
      <Button 
        title='Entrar'
        containerStyle={styles.loginBtn} 
        buttonStyle={{backgroundColor: '#25D366'}}
        onPress={loginValidations}
      />
      <Text style={styles.createAccount}> ¿ No tienes cuenta ?
      <Text 
        style={styles.account}
        onPress={() => navigation.navigate('register')}
      >
        {' '} Crear cuenta </Text>
      </Text>
      <Divider style={{
        backgroundColor: '#128C7E',
        height: 1,
        width: '90%',
        marginTop: 20
      }}/>
      <Text style={styles.o}> O </Text>
      <View style={styles.btnsContainer}>
        <TouchableOpacity style={styles.socialBtn}>
          <Icon 
            size={24}
            type='material-community'
            name='google'
            color= '#fff'
            backgroundColor='transparent'
          /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <Icon 
            size={24}
            type='material-community'
            name='facebook'
            color= '#fff'
            backgroundColor='transparent'
          /> 
        </TouchableOpacity>
      </View>
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
  loginBtn: {
    width: '90%',
    marginTop: 20
  },
  createAccount: {
    marginTop: 20
  },
  account: {
    color: '#128C7E',
    fontSize: 15
  },
  o: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    color: '#128C7E'
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  socialBtn: {
    backgroundColor: '#25D366',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5
  }
})