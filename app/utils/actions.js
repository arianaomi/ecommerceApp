
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


export const sendAuthConfirmPhone = async (phone, recaptcha) => {
  let verificationId = ''

  await firebase.auth().currentUser.reauthenticateWithPhoneNumber(phone, recaptcha.current)
  .then( response => {
    verificationId = response.verificationId
    console.log('llegue')
  })
  .catch( error => console.log(error) )

  return  verificationId
}

export const confirmCode = async (verificationId, code) => {
  let result = false 
  const credentials = firebase.auth.phoneAuthProvider.credentials( verificationId, code)
  await firebase.auth().currentUser.linkWithCredential(credentials)
  .then (response => result = true)
  .catch (error => console.log(error))
  return result
}