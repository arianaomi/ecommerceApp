import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import AuthenticateRoutes from './AuthenticateRoutes'
import AccountStack from './AccountStack'
import { phoneValidation } from '../utils/actions'

export default function Switchavigator () {
  const [phoneAuth, setPhoneAuth] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   phoneValidation(setPhoneAuth)
   setTimeout (() => {
     setLoading(false)
   }, 5000)
  }, [])

  if(loading){
    return <Loading isVisible={loading} text='Cargando configuración' />
  }else {
    return phoneAuth ? <AuthenticateRoutes /> : <AccountStack />
  }


}