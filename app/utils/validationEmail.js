//ToDo: cambiar nombre al archivo 

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions/'
import Constants from 'expo-constants';

export const validationEmail = text => {
  let reg =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (reg.test(text) === false) {
    return false
  } else {
    return true
  }
}

export const cargarImagenesxAspecto = async (array) => {
  let imgResponse = { status: false, imagen: "" };
  const resultPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
  const cameraPermissions = resultPermissions.status; // retorna el status del permiso 

  console.log(cameraPermissions)
  if (cameraPermissions === "denied") {
    alert("Usted debe permitir el accesos para cargar las imagenes");
   } else {
    // Abriendo la galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: array,
      quality: 1,
    });
    if (!result.cancelled) {
      imgResponse = { status: true, imagen: result.uri }; // nos tare la url de la imagen
    }
  }
  return imgResponse;
};


export const convertirFicheroBlob = async (rutafisica) => {
  const fichero = await fetch(rutafisica);
  const blob = await fichero.blob()

  return blob
}