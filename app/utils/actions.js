
import { firebaseApp } from './firebase'
import { Platform } from 'react-native'
import * as firebase from 'firebase'
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions"
import 'firebase/firestore'
import uuid from 'random-uuid-v4'
import { map } from 'lodash'
import { convertirFicheroBlob } from '../utils/validationEmail'


const db = firebase.firestore(firebaseApp)

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export const loginValidation = (setLoginValidation) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setLoginValidation(true)
    } else {
      setLoginValidation(false)
    }
  })
}

export const signOut = () => {
  firebase.auth().signOut()
}

export const phoneValidation = (setPhoneAuth) => {
  //validacion si tiene un tel registrado
  // firebase.auth().onAuthStateChanged( user => {
  //   if(user.phoneNumber) {
  //     setPhoneAuth(true)
  //   }
  // })
  db.collection('User')
    .doc(getUser().uid)
    .onSnapshot(snapshot => {
      setPhoneAuth(snapshot.exists)
    })
}


export const sendAuthConfirmPhone = async (phone, recaptcha) => {
  let verificationId = ''

  await firebase.auth().currentUser.reauthenticateWithPhoneNumber(phone, recaptcha.current)
    .then(response => {
      verificationId = response.verificationId
      console.log('llegue')
    })
    .catch(error => console.log(error))

  return verificationId
}

export const confirmCode = async (verificationId, code) => {
  let result = false
  const credentials = firebase.auth.PhoneAuthProvider.credential(verificationId, code)

  await firebase.auth().currentUser.linkWithCredential(credentials) //unir las credenciales en firebase
    .then(response => result = true)
    .catch(error => console.log(error))
  return result
}


export const getToken = async () => {
  let token = "";
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  console.log('Token', token)
  return token;
};

export const getUser = () => {
  return firebase.auth().currentUser
}


export const addSpecificRegister = async (collection, doc, data) => {

  const result = {
    error: "",
    statusresponse: false,
    data: null
  }
  await db.collection(collection).doc(doc)
    .set(data, { merge: true }) // merge nos permite actlaizar datos sin necesidad de hacer un put o patch 
    .then(response => result.statusresponse = true)
    .catch(error => {
      result.error = error
    })
  return result
}
// funcion que sube imagenes 
export const subirImagenesBatch = async (imagenes, ruta) => {

  // subir imagene necesitamos convertir las imagenes a blob
  const imagenesURL = []

  await Promise.all(
    map(imagenes, async (image) => {
      const blob = await convertirFicheroBlob(image)
      const ref = firebase.storage().ref(ruta).child(uuid()) //ruta en el storage

      await ref.put(blob).then(async (result) => {
        await firebase
          .storage()
          .ref(`${ruta}/${result.metadata.name}`)
          .getDownloadURL()
          .then((imagenUrl) => {
            imagenesURL.push(imagenUrl)
          })
      })
    })
  )

  return imagenesURL
}
// funcion que sube archivos

export const subirArchivos = async (files, ruta) => {

  // subir imagene necesitamos convertir las files a blob
  const filesURL = []

  await Promise.all(
    map(files, async () => {

      const ref = firebase.storage().ref(ruta).child(uuid()) //ruta en el storage

      await ref.put(file).then(async (result) => {
        await firebase
          .storage()
          .ref(`${ruta}/${result.metadata.name}`)
          .getDownloadURL()
          .then((fileUrl) => {
            filesURL.push(fileUrl)
          })
      })
    })
  )

  return imagenesURL
}
//---

export const actualizarPerfil = async (data) => {
  let respuesta = false;
  await firebase.auth().currentUser.updateProfile(data)
    .then(response => {
      respuesta = true
    })
  return respuesta
}


export const reautenticar = async (verificacionId, code) => {
  let response = { statusresponse: false }

  const credenciales = new firebase.auth.PhoneAuthProvider.credential(verificacionId, code)

  await firebase
    .auth()
    .currentUser.reauthenticateWithCredential(credenciales)
    .then(resultado => response.statusresponse = true)
    .catch(error => console.log(error))

  return response

}


// actualizar el email

export const actualizarEmailFirebase = async (email) => {
  let resposne = { statusresponse: false }
  await firebase.auth().currentUser.updateEmail(email)
    .then(respuesta => response.statusresponse = true)
    .catch(err => resposne.statusresponse = false)

  return resposne

}

export const actualizarTelefono = async (verificationId, code) => {
  let response = { statusresponse: false };
  // console.log('telefono')
  // console.log(verificationId);
  // console.log(code);

  const credenciales = new firebase.auth.PhoneAuthProvider.credential(
    verificationId, code);


  await firebase.auth().currentUser.updatePhoneNumber(credenciales).then((resultado) => (response.statusresponse = true)).catch((err) => { console.log(err); });

  return response;
};

//subir productos a firebase

export const addRegistro = async (coleccion, data) => {
  const result = {
    error: "",
    statusresponse: false,
    data: null
  }
  await db.collection(coleccion)
    .add(data)
    .then(response => result.statusresponse = true)
    .catch(error => {
      result.error = error
    })
  return result
}