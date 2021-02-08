
import { firebaseApp } from './firebase'
import * as firebase from 'firebase'

export const loginValidation = (setLoginValidation) => {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      setLoginValidation(true)
    } else {
      setLoginValidation(false)
    }
  })
}

export const signOut = () => {
  firebase.auth().signOut()
}

export const phoneValidation = ( setPhoneAuth) => {
  firebase.auth().onAuthStateChanged( user => {
    if(user.phoneNumber) {
      setPhoneAuth(true)
    }
  })
}

