
import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
// utils
import { loginValidation } from './app/utils/actions'
// My components
import SwitchNavigator from './app/navigations/SwitchNavigator'
import UnauthenticatedRoutes from './app/navigations/UnauthenticatedRoutes'
import Loading from './app/components/Loading';

export default function App() {

  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    loginValidation(setUser)
    setLoading(false)
    
  }, [])

  if(loading){
    return <Loading text='cargando' isVisible={loading} />
  }

  return user ? <SwitchNavigator/> : <UnauthenticatedRoutes />
 
}

