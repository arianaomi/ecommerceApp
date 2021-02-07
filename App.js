
import React, { useEffect }  from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import AuthenticatedRoutes from './app/navigations/AuthenticateRoutes'
import UnauthenticatedRoutes from './app/navigations/UnauthenticatedRoutes'

export default function App() {
  
  return (
    <UnauthenticatedRoutes />
  );
}

