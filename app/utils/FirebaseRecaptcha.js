import React from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

import Constants from 'expo-constants'

export default function FirebaseRecaptcha({ recaptchaVerifier}) {
  return (
    <FirebaseRecaptchaVerifierModal 
      ref={recaptchaVerifier}
      title= 'Confirma que no eres un bot'
      cancelLabel='x'
      firebaseConfig={Constants.manifest.extra.firebase}
    />
  )
}
