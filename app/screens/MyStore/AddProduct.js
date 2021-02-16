import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Input, Image, Button, Icon, Avatar, AirbnbRating} from 'react-native-elements'
import { map, size, filter, isEmpty} from 'lodash'
import  { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

// My components 
import Loading from '../../components/Loading'
export default function AddProduct() {

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcipn] = useState('')
  const [precio, setPrecio] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [categoria, setCategoria] = useState('')
  const [errores, setErrores] = useState([])

  const btnRef = useRef()

  const navigation = useNavigation()

  return (
    <KeyboardAwareScrollView>
      <Text>agregar producto</Text>
    </KeyboardAwareScrollView>
  )
}
