import React, {useState, usRef} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import CodeInput from 'react-native-code-input/'
import { useNavigation } from '@react-navigation/native'
import Loading from '../../components/Loading'
import { confirmCode } from '../../utils/actions'



export default function ConfirmPhone({route}) {
  const {verificationId} = route.params
  console.log(verificationId)

  const [loading, setLoading] = useState(false) 

  const confirmSMSCode = async (code) => {
    const result = await confirmCode(verificationId, code)
    console.log(result)
    // Extraer la informacion del usuario
    // Obtner el token - pushnotification
    // Hacer las validaciones y confirmar autenticación
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