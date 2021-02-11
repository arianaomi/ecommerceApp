import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Avatar, Icon, Input } from 'react-native-elements'

export default function Profile() {
  return (
    <View>
      <StatusBar backgroundColor='#128C7E'  />
      <HeaderBG />
    </View>
  )
}

function HeaderBG () {
  return (
    <View style={styles.avatarInline}>
      <View style={styles.bg}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold' }}> Nombre </Text>
        <HeaderAvatar />


      </View>
    </View>
  )
}

function HeaderAvatar (props) { 
  const changePhoto = () => console.log('hi')
  return (
    <View>
      <Avatar
        source={require('../../../assets/avatar.jpg')}
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