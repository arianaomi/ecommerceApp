import React, { useRef } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'

export default function CustomInput({label, id, obtenerValor, placeholder, onchangeInput, editable, setEditable, actualizarValor}) {

  // Editar la informacion

  const editar = () => {
    setEditable(!editable)
  }

  return (
    <View style={styles.input}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <TextInput 
          style={styles.textInputInternal} 
          placeholder={placeholder}
          key={id}
          value={obtenerValor(id)}
          onChangeText={ text => {
            onchangeInput(id, text)
          }}
        />
        {
          editable? (
            <Icon 
              name = 'content-save'
              type = 'material-community'
              size= {24}
              onPress={() => {
                actualizarValor(id, obtenerValor(id))
                editar()
              } }
              style={styles.icon}
            />
          ) :(
            <Icon 
            name = 'pencil'
            type = 'material-community'
            size= {24}
            onPress={ editar}
            style={styles.icon}
          />
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 1,
  
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
