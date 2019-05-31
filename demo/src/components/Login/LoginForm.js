import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Button, ActivityIndicator, CheckBox} from 'react-native';

export class Botoncito extends Component {
    render(){
        return (
                
                <TouchableOpacity 
                style={this.props.status ? styles.buttonContainer2 : styles.buttonContainer1}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
        
        )
    }
}

export default class LoginForm extends Component{

    constructor(){
        super()

        this.state = {status: true}
    }
    clicked(){
        this.setState({
            status: !this.state.status
        })
    }

    render(){
        return(
            <View style={styles.container}>
            <StatusBar
            barStyle="light-content"
            />
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

                <Botoncito status={this.state.status} />
                
                <TouchableOpacity style={styles.buttonContainer1}>
                    <Text                 
                    style={styles.buttonText} onPress={this.clicked.bind(this)}>SORPRESA</Text>
                </TouchableOpacity>

                <Button
                onPress={onPressSaludar}
                title="Saludar"
                color="#841584"
                accessibilityLabel="Botón para saludar"
                />

                <ActivityIndicator size="large" color="#0000ff" />

                <CheckBox
                title='Click Here'
                checked={this.state.checked}
/>
                
            </View>
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