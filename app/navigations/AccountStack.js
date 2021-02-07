
import React from 'react'
import  { createStackNavigator } from '@react-navigation/stack'

import ConfirmPhone from '../screens/Account/ConfirmPhone'
import SendConfirmPhone from '../screens/Account/SendConfirmPhone'

const Stack = createStackNavigator() // instanciando ek stack

export default function AccountStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen 
        name='confirmPhone'
        component={ConfirmPhone}
        option={{
          title: 'Confirma tu número',
          headerStyle: { background: '#128C7E'},
          headerTintColor: '#fff'
        }}
      />
       <Stack.Screen 
        name='sendConfirmPhone'
        component={SendConfirmPhone}
        option={{
          title: 'Confirma tu número (send)',
          headerStyle: { background: '#128C7E'},
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  )
}
