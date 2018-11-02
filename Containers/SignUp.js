import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

export default class SignUp extends React.Component {

render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
      
        <TextInput
          placeholder="Correo empresarial"
          autoCapitalize="none"
          style={styles.textInput}
        />
        <TextInput
          secureTextEntry
          placeholder="Contraseña"
          autoCapitalize="none"
          style={styles.textInput}
        />
        <Button title="Registrarse" />
        <Button
          title="Ya tienes una cuenta? Inicia sesión"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})