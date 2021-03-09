import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native'
import { Input, Image, Button, Icon, Avatar, AirbnbRating } from 'react-native-elements'
import { map, size, filter, isEmpty } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { cargarImagenesxAspecto } from '../../utils/validationEmail'
import { subirImagenesBatch, addRegistro, getUser } from '../../utils/actions'

// My components 
import Loading from '../../components/Loading'
export default function AddProduct() {

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcipn] = useState('')
  const [precio, setPrecio] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [categoria, setCategoria] = useState('')
  const [errores, setErrores] = useState({})
  const [rating, setRating] = useState(5)

  const [loading, setLoading] = useState(false)

  const btnRef = useRef()

  const navigation = useNavigation()

  const addProducto = async () => {
    setErrores({})
    console.log(imagenes)
    if (isEmpty(titulo)) {
      setErrores({
        titulo: 'El campo titulo es obligatorio'
      })
    } else if (isEmpty(descripcion)) {
      setErrores({
        descripcion: 'El campo es obligatorio'
      })
      // }else if (parseFloat(precio) > 0 )  {
      //   setErrores({ precio: 'El precio debe ser mayor a 0' })
      // }else if ( isEmpty(categoria) ) {
      //   Alert.alert(
      //     'Seleccione una categoria',
      //     {
      //       style:'cancel',
      //       text:'Entendido'
      //     }
      //   )
      // }else if (imagenes.length === 0){
      //   Alert.alert(
      //     'Seleccione una imagen',
      //     {
      //       style:'cancel',
      //       text:'Entendido'
      //     }
      //   )
    } else {
      setLoading(true)
      const imagenerUrl = await subirImagenesBatch(imagenes, 'imagenesProductos')
      console.log(imagenerUrl)
      const producto = {
        titulo,
        descripcion,
        precio,
        usuario: getUser().uid,
        imagenes: imagenes,
        status: 1,
        fechacreacion: new Date(),
        rating,
        categoria

      }
      const registrarProduct = await addRegistro('Productos', producto)
      if (registrarProduct.statusresponse) {
        setLoading(false)
        Alert.alert(
          'Registro exitoso',
          'El producto se ha registrado correctamente'
          [
          {
            text: 'aceptar',
            style: 'cancel',
            onPress: () => navigation.navigate('myStore')
          }
          ]
        )
      } else {
        setLoading(false)
        Alert.alert(
          'Registro fallido',
          'Ha ocurrido un error'
          [
          {
            text: 'aceptar',
            style: 'cancel',

          }
          ]
        )
      }

    }
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
    >
      <View
        style={{
          borderBottomColor: '#25D366',
          borderBottomWidth: 2,
          width: 100,
          marginTop: 20,
          alignSelf: 'center'
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
        onFinishRating={value => setRating(value)}
      />
      <Text style={styles.txtLabel}> Cargar imágenes</Text>
      <SubirImagenes imagenes={imagenes} setImagenes={setImagenes} />
      <Text style={styles.txtLabel}> Asignar categoria</Text>
      <Botoneras categoria={categoria} setCategoria={setCategoria} />
      <Button
        title='Agregar nuevo producto'
        buttonStyle={styles.btnAddNew}
        ref={btnRef}
        onPress={addProducto}
      />
      <Loading isVisible={loading} text='favor espere' />
    </KeyboardAwareScrollView>
  )
}

//Nuevo componente para subir imagenes

function SubirImagenes({ imagenes, setImagenes }) {

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
          text: 'Eliminar',
          onPress: () => {
            setImagenes(filter(imagenes, imagenURL => imagenURL !== imagen))
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
            onPress={async (imagen) => {
              const resultado = await cargarImagenesxAspecto([1, 1])
              if (resultado.status) {
                setImagenes([...imagenes, resultado.imagen])
              }
            }}
          />
        )
      }
      {
        map(imagenes, (imagen, index) => (
          <Avatar
            key={index}
            style={styles.miniatura}
            source={{ uri: imagen }}
            onPress={() => {
              removerImagen(imagen)
            }}
          />
        ))
      }

    </ScrollView>
  )
}

// componente de Categorias

function Botoneras({ categoria, setCategoria }) {
  return (
    <View style={styles.botonera}>
      <TouchableOpacity
        style={styles.btnCategoria}
        onPress={() => setCategoria('libros')}
      >
        <Icon
          type='material-community'
          name='book-open'
          size={24}
          color={categoria === 'libros' ? '#125C7E' : '#757575'}
          reverse
        />
        <Text>Libros</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCategoria}
        onPress={() => setCategoria('ideas')}
      >
        <Icon
          type='material-community'
          name='lightbulb-on-outline'
          size={24}
          color={categoria === 'ideas' ? '#125C7E' : '#757575'}
          reverse
        />
        <Text>Ideas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCategoria}
        onPress={() => setCategoria('articulos')}
      >
        <Icon
          type='material-community'
          name='cart-arrow-down'
          size={24}
          color={categoria === 'articulos' ? '#125C7E' : '#757575'}
          reverse
        />
        <Text>Artículos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCategoria}
        onPress={() => setCategoria('servicios')}
      >
        <Icon
          type='material-community'
          name='account'
          size={24}
          color={categoria === 'servicios' ? '#125C7E' : '#757575'}
          reverse
        />
        <Text>Servicios</Text>
      </TouchableOpacity>
    </View>
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
  input: {
    width: '90%',
    borderRadius: 10,
    borderColor: '#707070',
    marginTop: 20,
    marginHorizontal: 20,
    height: 50
  },
  textarea: {
    height: 150
  },
  txtLabel: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#075E54'
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
  containerIcon: {
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 150,
    width: 100,
    backgroundColor: '#E3E3E3',
    padding: 10
  },
  miniatura: {
    width: 100,
    height: 150,
    marginRight: 10
  },
  botonera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  btnCategoria: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})