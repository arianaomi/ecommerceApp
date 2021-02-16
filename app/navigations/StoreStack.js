
import React from 'react'
import  { createStackNavigator } from '@react-navigation/stack'

import Store from '../screens/Store/Store'

import Contact from '../screens/Store/Contact'
import MessageList from '../screens/Store/MessageList'
import Details from '../screens/Store/Details'

const Stack = createStackNavigator() // instanciando ek stack

export default function StoreStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='store' 
        component={Store}
        options={{headerShown:false}}
      />
      
       <Stack.Screen
        name='details' 
        component={Details}
        options={{
          headerTransparent: true,
          headerTintColor: "#128C7E",
          title: ""
        }}
      />
      
      <Stack.Screen
        name='messageList' 
        component={MessageList}
        options={{
          headerTransparent: true,
          headerTintColor: "#128C7E",
          title: ""
        }}
      />
      <Stack.Screen
        name='contact' 
        component={Contact}
        options={{
          headerTransparent: true,
          headerTintColor: "#128C7E",
          title: ""
        }}
      />
    </Stack.Navigator>
  )
}