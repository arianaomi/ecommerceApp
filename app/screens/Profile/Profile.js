import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Avatar, Icon, Input } from 'react-native-elements'

import  { cargarImagenesxAspecto, validationEmail } from '../../utils/validationEmail'
import { 
  subirImagenesBatch, 
  addSpecificRegister,
  actualizarPerfil, 
  getUser,
  sendAuthConfirmPhone,
  reautenticar,
  actualizarEmailFirebase,
  actualizarTelefono
} from '../../utils/actions'
import Loading from '../../components/Loading'

import CodeInput from 'react-native-code-input'
//my componente

import CustomInput from  '../../components/CustomInput'
import Modal from '../../components/Modal'
import FirebaseRecaptcha from '../../utils/FirebaseRecaptcha'
import { set } from 'lodash'


export default function Profile() {
  const usuario = getUser()
  //console.log(usuario)

  const [imagenPerfil, setImagenPerfil] = useState('')
  const [loading, setLoading] = useState(false)
  //Estados para obtener los datos del usuario
  const [displayName, setDisplayName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
 
  //Estados para cambiar valores
  const [editableName, setEditableName] = useState(false)
  const [editableEmail, setEditableEmail] = useState(false)
  const [editablePhone, setEditablePhone] = useState(false)

  const [verificationId, setVerificationId] = useState('')
  const [isVisibleModal, setIsVisibleModal] = useState(false)

  const [updatePhone, setUpdatePhone] = useState(false)

  const recaptcha = useRef()

  useEffect (() => {
    setImagenPerfil(usuario.photoURL)
    setDisplayName(usuario.displayName)
    setPhoneNumber(usuario.phoneNumber)
    setEmail(usuario.email)
   
  },[])

  // cambiar valores
  const onchangeInput = (input, valor) => {
    switch(input) {
      case 'displayName': 
        setDisplayName(valor)
        break
      case 'email':
        setEmail(valor)
        break
      case 'phoneNumber':
        setPhoneNumber(valor)
        break
    }
  }
  const obtenerValor = (input ) => {
    switch(input) {
      case 'displayName': 
        return displayName
        break
      case 'email':
        return email
        break
      case 'phoneNumber':
        return phoneNumber
        break
    }
  }

  const actualizarValor = async (input,valor) => {

    switch(input) {
      case 'displayName': 
          await actualizarPerfil({displayName: valor})
          addSpecificRegister('User', usuario.uid, {displayName: valor})
          console.log(usuario)
        break
      case 'email':
         if(valor !== usuario.email){
           if(validationEmail(valor)) {
             const verification = await sendAuthConfirmPhone(phoneNumber, recaptcha)
             if(verification) {
               setVerificationId(verification)
               setIsVisibleModal(true)
             }else {
               alert('ha ocurrido un error')
               setEmail(usuario.email)
             }
           }
         }
        break
      case 'phoneNumber':
        if(valor !== usuario.phoneNumber){
          
            const verification = await sendAuthConfirmPhone(phoneNumber, recaptcha)
            if(verification) {
              setVerificationId(verification)
              setUpdatePhone(true)
              setIsVisibleModal(true)
            }else {
              alert('ha ocurrido un error')
              setPhoneNumber(usuario.phoneNumber)
            }
          
        }
        break
    }
  }

  const ConfirmarCodigo = async (verificacionId, code) => {
    // console.log(verificationId)
    // console.log(code)
   // console.log(updatePhone)
    setLoading(true)
    if (updatePhone) {
     
       const telefono = await actualizarTelefono(verificacionId, code);
       const updateregistro = await addSpecificRegister(
         "User",
      usuario.uid,
        { phoneNumber: phoneNumber }
       );
       setUpdatePhone(false);
      console.log(telefono);
     console.log(updateregistro);
    }else {
      const resulatado = await reautenticar(verificacionId, code)
      console.log('verification',resulatado)
      setLoading(false)

      if( resulatado.statusresponse) {
        const emailResponse = await actualizarEmailFirebase(email)
        const updateRegistro = await addSpecificRegister(
          'User', 
          usuario.uid, 
          {email:email}
        )
        console.log(emailResponse)
        console.log(updateRegistro)
        setLoading(false)
        setIsVisibleModal(false)
      }else {
        alert('Ha ocurrido un error al actualizar el correo')
      }
    }
    setLoading(false)
    setIsVisibleModal(false)
  }


  return (
    <View>
      <StatusBar backgroundColor='#128C7E'  />
      <HeaderBG  displayName={displayName}/>
      <HeaderAvatar 
        usuario={usuario}
        imagenPerfil={imagenPerfil} 
        setImagenPerfil={setImagenPerfil}
        setLoading={setLoading}
      />
      <FormDatos 
        onchangeInput={onchangeInput}
        obtenerValor={obtenerValor}
        setEditableEmail={setEditableEmail}
        setEditableName={setEditableName}
        setEditablePhone={setEditablePhone}
        editableEmail={editableEmail}
        editableName={editableName}
        editablePhone={editablePhone}
        actualizarValor={actualizarValor}
      />
      <ModalVerification 
      isVisibleModal={isVisibleModal}
      setIsVisibleModal={setIsVisibleModal}
      verificationId={verificationId}
      ConfirmarCodigo={ConfirmarCodigo}
      />
      <FirebaseRecaptcha recaptchaVerifier={recaptcha}/>
      <Loading isVisible={loading} text='Espere'/>
    </View>
  )
}

function HeaderBG ({displayName}) {
  return (
    <View style={styles.avatarInline}>
      <View style={styles.bg}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
           {displayName ? displayName: 'Ususario' }
        </Text>
      </View>
    </View>
  )
}

function HeaderAvatar ({usuario, imagenPerfil, setImagenPerfil, setLoading, }) { 
  const {uid} = usuario

  //* funcion para subir obtener la ur de las imagenes
  const changePhoto = async () => {
    const resultado = await cargarImagenesxAspecto([1, 1]);
    console.log(resultado)
    if(resultado.status) {
      setLoading(true)
      const url = await subirImagenesBatch([resultado.imagen], "Profile") // imagenes y carpeta donde se van a guardar
      const update = await actualizarPerfil({photoURL: url[0]})
      const response = await addSpecificRegister("User",uid,{photoURL: url[0]})
      
      if(response.statusresponse){
        setImagenPerfil(url[0])
        setLoading(false)
      }else {
        setLoading(false)
        alert('Ha ocurrido un error')
      }
    }
    
  }

  return (
    <View style={styles.avatarInline}>
      <Avatar
        source={imagenPerfil 
          ?{uri:imagenPerfil}
          : require('../../../assets/avatar.jpg')
        }
        styles={styles.avatar}
        size='large'  
        rounded
        showAccessory
        onAccessoryPress={changePhoto}
      >
         <Avatar.Accessory onPress={changePhoto} style={{width:30, height:30}}/>
      </Avatar>
    </View>
  )
}

function FormDatos ({
  onchangeInput,
  obtenerValor, 
  setEditableEmail, 
  setEditableName, 
  setEditablePhone, 
  editableName, 
  editableEmail, 
  editablePhone, 
  actualizarValor
}){
  return (
    <View>
       <CustomInput 
        id='displayName'
        label='Nombre'
        obtenerValor={obtenerValor}
        placeholder = 'Nombre'
        onchangeInput={onchangeInput}
        setEditable={setEditableName}
        editable={editableName}
        actualizarValor={actualizarValor}
       />
        <CustomInput 
        id='email'
        label='Correo'
        obtenerValor={obtenerValor}
        placeholder = 'ejemplo@ejemplo.com'
        onchangeInput={onchangeInput}
        setEditable={setEditableEmail}
        editable={editableEmail}
        actualizarValor={actualizarValor}
       />
       <CustomInput 
        id='phoneNumber'
        label='Teléfono'
        obtenerValor={obtenerValor}
        placeholder = '+00 0000000000'
        onchangeInput={onchangeInput}
        setEditable={setEditablePhone}
        editable={editablePhone}
        actualizarValor={actualizarValor}
       />
    </View>
  )
}

function ModalVerification ({ isVisibleModal, setIsVisibleModal, ConfirmarCodigo, verificationId}){
  return (
    <Modal
      isVisible={isVisibleModal}
      setIsVisible={setIsVisibleModal}
    >
      <View style={styles.confirmacion}>
        <Text style={styles.titulomodal}>Confirmar Código</Text>
        <Text style={styles.detalle}>
          Se ha enviado un código de verificación a su número de teléfono
        </Text>

        <CodeInput
          secureTextEntry
          activeColor="#128c7e"
          inactiveColor="#128c7e"
          autoFocus={false}
          inputPosition="center"
          size={40}
          containerStyle={{ marginTop: 30 }}
          codeInputStyle={{ borderWidth: 1.5 }}
          codeLength={6}
          onFulfill={(code) => {
            ConfirmarCodigo(verificationId, code);
          }}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bg:{
    width: '100%',
    height: 200,
    borderBottomRightRadius: 400,
    borderBottomLeftRadius: 400,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50
  },
  avatarInline:{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginTop: -70
  },
  avatar: {
    width: 80,
    height: 80

  },
  confirmacion: {
    height: 200,
    width: '100%',
    alignItems: 'center'
  },
  titulomodal:{
    fontWeight: 'bold',
    fontSize: 18
  },
  detalle: {
    marginTop: 20, 
    fontSize: 14,
    textAlign: 'center'
  }
})