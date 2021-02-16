import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native'
import { Input, Image, Button, Icon, Avatar, AirbnbRating} from 'react-native-elements'
import { map, size, filter, isEmpty} from 'lodash'
import  { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { cargarImagenesxAspecto } from '../../utils/validationEmail'

// My components 
import Loading from '../../components/Loading'
export default function AddProduct() {

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcipn] = useState('')
  const [precio, setPrecio] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [categoria, setCategoria] = useState('')
  const [errores, setErrores] = useState([])
  const [rating, setRating] = useState(5)

  const btnRef = useRef()

  const navigation = useNavigation()

  return (
    <KeyboardAwareScrollView
      style={styles.container}
    >
      <View 
        style={{
          borderBottomColor:'#25D366', 
          borderBottomWidth: 2, 
          width: 100, 
          marginTop: 20, 
          alignSelf:'center'
        }}
      />
      <Input 
        placeholder='titulo'
        onChangeText={text => setTitulo(text)}
        inputStyle={styles.input}
        errorMessage={errores.titulo}
      />
      <Input 
        placeholder='Descripcion'
        onChangeText={text => setDescripcipn(text)}
        inputStyle={styles.textarea}
        errorMessage={errores.descripcion}
        multiline
      />
      <Input 
        placeholder='Precio'
        onChangeText={text => setPrecio(parseFloat(text))}
        inputStyle={styles.input}
        errorMessage={errores.precio}
        keyboardType='name-phone-pad'
      />
      <Text style={styles.txtLabel}> Calidad del servicio o producto</Text>
      <AirbnbRating 
        count={5}
        reviews={['Baja', 'Deficiente', 'Normal', 'Muy Bueno', 'Excelente']}
        defaultRating={5}
        size={35}
        onFinishRating={value =>setRating(value)}
      />
       <Text style={styles.txtLabel}> Cargar imágenes</Text>
       <SubirImagenes imagenes={imagenes} setImagenes={setImagenes}/>
       <Text style={styles.txtLabel}> Asignar categoria</Text>
       <Button 
        title='Agregar nuevo producto'
        buttonStyle={styles.btnAddNew}
        ref={btnRef}
       />
    </KeyboardAwareScrollView>
  )
}

//Nuevo componente para subir imagenes

function SubirImagenes ({imagenes, setImagenes}) {

  const removerImagen = (imagen) => { 
    Alert.alert( 
      'Eliminar imagen', 
      '¿Estás seguro de que quieres eliminar la imagen ?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text:'Eliminar',
          onPress: () =>{
            setImagenes(filter(imagenes,  imagenURL  => imagenURL !== imagen))
          }
        }
      ]
    )
  }

  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.viewImage}
    >
      {
        size(imagenes) < 5 && (
          <Icon 
            name='plus'
            type='material-community'
            color='#7a7a7a'
            containerStyle={styles.containerIcon}
            onPress={async () => {
              const resultado = await cargarImagenesxAspecto([1,1])
              if(resultado.status){
                setImagenes([...imagenes, resultado.imagen])
              }
            }}
          />
        )
      }
      {
        map(imagenes, (imagen, index)=> (
          <Avatar 
            key={index}
            style={styles.miniatura}
            source={{uri: imagen}}
            onPress={()=> {
              removerImagen(imagen)
            }}
          />
       ))
      }
      
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: 5,
    padding: 5,
    elevation: 3
  },
  input:{
    width: '90%',
    borderRadius:10,
    borderColor:'#707070',
    marginTop: 20, 
    marginHorizontal: 20,
    height: 50
  },
  textarea:{
    height: 150
  },
  txtLabel: {
    fontSize: 20, 
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#075E54'
  },
  btnAddNew: {
    backgroundColor: '#128C7E',
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20
  },
  viewImage: {
    flexDirection: 'row',
    marginHorizontal: 20, 
    marginTop: 30, 
    marginBottom: 10
  },
  containerIcon: {
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 150,
    width: 100,
    backgroundColor: '#E3E3E3',
    padding: 10
  },
  miniatura:{
    width: 100,
    height: 150,
    marginRight: 10
  }
})