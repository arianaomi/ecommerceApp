
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../screens/Profile/Profile'

const Stack = createStackNavigator ()

export default function ProfileStack() {
  return (
   <Stack.Navigator>
     <Stack.Screen 
      name='profile'
      component={Profile}
      options={{headerShown: false}}
     />
   </Stack.Navigator>
  )
}
