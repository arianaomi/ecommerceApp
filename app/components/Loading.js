import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Overlay } from 'react-native-elements'
import {  Grid, Swing } from 'react-native-animated-spinkit'

export default function Loading({ isVisible, text}) {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
    >
     <View  style={styles.view}>
       <Grid
        size={60}
        color= '#128C7E'
       />
       {text && <Text style={styles.text}>{text}</Text> }
     </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: '#128C7E',
    borderRadius: 20,
    width: '90%',
    height: Dimensions.get('window').height / 2

  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: { 
    color: '#128C7E',
    marginTop: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 24
  }
})