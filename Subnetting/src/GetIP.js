import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, Button, StatusBar } from 'react-native';

export default class GetIP extends Component {

        

    render() {
        return(
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
        

          <View style={styles.formContainer}>
          
            <StatusBar barStyle="light-content" />

            <TextInput
              placeholder="Username or Email" 
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input} 
              />

              <TextInput
              placeholder="Password" 
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              secureTextEntry
              style={styles.input}
              ref={(input) => this.passwordInput} 
              />

              <Button
              onPress={onPressSaludar}
              title="Saludasssr"
              color="#841584"
              accessibilityLabel="Botón para saludar"
              />
              </View>
          </KeyboardAvoidingView>
        );
    }
}
  
const onPressSaludar = () => {
  alert('¡Hola, soy una alerta!')
 }
 

const styles = StyleSheet.create({
  container: {
      padding: 20,
  },
  input: {
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 20,
      color: '#FFF',
      paddingHorizontal: 10,
  },
  buttonContainer1: {
      backgroundColor: '#2980b9',
      paddingVertical: 15,
      marginBottom: 20
  },
  buttonContainer2: {
      backgroundColor: '#f92672',
      paddingVertical: 15,
      marginBottom: 20
  },
  buttonText: {
      textAlign: 'center',
      color: '#FFF',
      fontWeight: '700'
  }
});