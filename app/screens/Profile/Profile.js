import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Avatar, Icon, Input } from 'react-native-elements'

import  { cargarImagenesxAspecto } from '../../utils/validationEmail'
import { subirImagenesBatch, addSpecificRegister, actualizarPerfil, getUser } from '../../utils/actions'
import Loading from '../../components/Loading'

export default function Profile() {
  const usuario = getUser()
  //console.log(usuario)

  const [imagenPerfil, setImagenPerfil] = useState('')
  const [loading, setLoading] = useState(false)
  //Estados para cambiar los datos del usuario

  useEffect (() => {
    setImagenPerfil(usuario.photoURL)
   
  },[])
  
  return (
    <View>
      <StatusBar backgroundColor='#128C7E'  />
      <HeaderBG />
      <HeaderAvatar 
      
        usuario={usuario}
        imagenPerfil={imagenPerfil} 
        setImagenPerfil={setImagenPerfil}
        setLoading={setLoading}
      />
      <Loading isVisible={loading} text='Espere'/>
    </View>
  )
}

function HeaderBG () {
  return (
    <View style={styles.avatarInline}>
      <View style={styles.bg}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
           Nombre 
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

  }
})