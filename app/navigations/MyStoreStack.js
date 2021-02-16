
import React from 'react'
import  { createStackNavigator } from '@react-navigation/stack'

import EditProduct from '../screens/MyStore/EditProduct'
import MyStore from '../screens/MyStore/MyStore'
import AddProduct from '../screens/MyStore/AddProduct'
const Stack = createStackNavigator() // instanciando ek stack

export default function MyStoreStack () {
  return (
    <Stack.Navigator 
     screenOptions={{
        title: "Agregar nuevo producto",
        headerStyle: {
          backgroundColor:"#128C7E"
        },
        headerTintColor: "#fff"
      }}
    >
      <Stack.Screen
        name='myStore' 
        component={MyStore}
        options={{title: "Mi tienda"}}
      />
       <Stack.Screen
        name='addProduct' 
        component={AddProduct}
        options={{
          title: "Agregar nuevo producto",
          headerStyle:{backgroundColor:"#128C7E"},
          headerTintColor: "#fff"
      }}
      />
      <Stack.Screen
        name='editProduct' 
        component={EditProduct}
        options={{title: "Editar producto"}}
        
      />
    </Stack.Navigator>
  )
}