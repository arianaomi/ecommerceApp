import React, { useRef } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function CustomInput({label}) {
  return (
    <View style={styles.input}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <TextInput 
          style={styles.textInputInternal} 
          placeholder='text'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  
  },
  label:{
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#128C7E',
    fontSize: 16
  },
  textInputInternal:{
    fontSize: 20,
    width: '80%',
  },
  input:{
    borderBottomColor: '#cecece',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 5, 
    paddingHorizontal: 10
  }
})
