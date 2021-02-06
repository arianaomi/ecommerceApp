import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// My screens
import Login from '../screens/Account/Login'
import Register from '../screens/Account/Register'
import RestorePassword from '../screens/Account/RestorePassword'

const Stack = createStackNavigator()

export default function UnauthenticatedRoutes () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='login'
        screenOptions={{headerShown:false}}
      >
        <Stack.Screen 
          name='login' 
          component={Login} 
        />
        <Stack.Screen  
          name='register'
          component={Register}
        />
        <Stack.Screen  
          name='restorePassword'
          component={RestorePassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}