
import { firebaseApp } from './firebase'
import * as firebase from 'firebase'

export const loginValidation = () => {
  firebase.auth().onAuthStateChanged(user => {
    console.log(user)
  })
}



