
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDITFrripZoSzdaqYp8nm3VWtkZPPKiT28",
  authDomain: "whatscommerce-dee2a.firebaseapp.com",
  projectId: "whatscommerce-dee2a",
  storageBucket: "whatscommerce-dee2a.appspot.com",
  messagingSenderId: "497484027196",
  appId: "1:497484027196:web:b890fecec3d633defcfa39"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)