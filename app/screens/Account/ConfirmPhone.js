import React, {useState, usRef} from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import CodeInput from 'react-native-code-input/'
import { useNavigation } from '@react-navigation/native'
import Loading from '../../components/Loading'
import { confirmCode, getToken, getUser, addSpecificRegister } from '../../utils/actions'

export default function ConfirmPhone({route}) {
  const {verificationId} = route.params

  const [loading, setLoading] = useState(false) 

  const confirmSMSCode = async (code) => {
    setLoading(true)
    const result = await confirmCode(verificationId, code)
    if(result) {
      const token =await getToken() 
  
      const { displayName, email, phoneNumber, photoURL, providerId, uid} = getUser()
  
      const specificRegister = await addSpecificRegister('User',uid,{
        token,
        displayName,
        photoURL,
        email,
        creationDate: new Date()
      })
      setLoading(false)
    }else {
      setLoading(false)
      Alert.alert("Error", "Validar el código introducido",[{
        style: 'default',
        text: 'entendido'
      }])
    }
  }
  return (
    <View style={styles.container}>
      <Image  
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Revisar su sms e introduzca el código</Text>
      <CodeInput 
        activeColor="#fff"
        inactiveColor="#fff"
        autoFocus={true}
        inputPosition="center"
        size={50}
        codeLength={6}
        containerStyle={{ marginTop: 30 }}
        codeInputStyle={{ borderWidth: 1.5 }}
        onFulfill={(code) => {
          confirmSMSCode(code);
        }}
        secureTextEntry
    />
    <Loading isVisible={loading} text='espere'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#128C7E',
    paddingHorizontal: 20,
  },
  logo: {
    height: 106,
    width: 106,
    alignSelf: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    marginVertical: 20
  }
})