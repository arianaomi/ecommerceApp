import React from 'react'
import { StyleSheet} from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Modal({isVisible, setIsVisible, children }) {
 
  // funcion que se dispara cuando se presiona afuera del modal
  const closeModal = () => {
    setIsVisible(false)
  }

  return (
    <Overlay 
    isVisible={isVisible}
    overlayStyle={styles.overlay}
    onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    height: 'auto',
    width: '90%',
    backgroundColor: '#fff'
  }
})
