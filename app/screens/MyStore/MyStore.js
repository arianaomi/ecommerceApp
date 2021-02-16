import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import  { useNavigation } from '@react-navigation/native'

export default function MyStore() {
  const navigation = useNavigation()
  return (
    <View style={{flex: 1, justifyContent:'center'}}>
      <Text>Mi tienda ...</Text>
      <Icon 
        name='plus'
        type= 'material-community'
        color='#128c7e'
        containerStyle={styles.btnContainer}
        onPress={()=>{navigation.navigate('addProduct')}}
        reverse // sea un circulo
      />
    </View>
  )
}
const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right:10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2}, // posicion del shadow
    shadowOpacity: 0.2
  }
})