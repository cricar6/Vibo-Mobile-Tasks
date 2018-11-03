import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
export default class SignUp extends React.Component {

render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
      
        <Text
          style={styles.textLabel}
        >Correo Empresarial</Text>
        <TextInput
          placeholder="pgarcia@vibo.com"
          autoCapitalize="none"
          style={styles.textInput}
        />
        <Text
          style={styles.textLabel}>Contraseña</Text>
        <TextInput
          secureTextEntry
          placeholder="••••••••"
          autoCapitalize="none"
          style={styles.textInput}
        />
        <Button title="Registrarse"
        titleStyle={{color: "white"}}
        buttonStyle={styles.buttonStyle}
        />
        <Text
          style={styles.textRegistrate}>Ya tienes una cuenta?</Text>
        <Button
          title="Inicia sesión"
          titleStyle={styles.buttonTextRegistrate}
          buttonStyle={styles.buttonRegistrate}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FBFBFB",
    padding: 20
  },
  textInput: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10
  },
  textLabel: {
    width: "100%",
    textAlign: "left",
    margin: 10,
    color: "black"
  },
  buttonStyle: {
    backgroundColor: "#310432",
    width: "50%"
  },
  textRegistrate: {
    marginTop: 20,
    marginBottom: 10,
    color: "#310432",
  },
  buttonRegistrate: {
    backgroundColor: "#FBFBFB",
  },
  buttonTextRegistrate: {
    color: "#310432",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
})