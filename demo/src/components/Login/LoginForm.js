import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Button, ActivityIndicator, CheckBox} from 'react-native';



export default class LoginForm extends Component{

    constructor(){
        super()

        this.state = {
            valueIP: "192.168.0.1",
            valueMask: "255.255.255.0"
        }
    }

    onChangeTextIP = (valueIP) => {
        this.setState({ valueIP });
    }

    onChangeTextMask = (valueMask) => {
        this.setState({ valueMask });
    }

    guardarIPyMascara = () => {
        var IPByte = this.state.valueIP.split(".");
        var MaskByte = this.state.valueMask.split(".");
        var primerByte = parseInt(IPByte[0]);
        var clase;
        if (primerByte >= 0 && primerByte <= 127){
            clase = "A";
            alert("Su IP es " + this.state.valueIP + ", su mascara de subred es " + this.state.valueMask + " y su clase IP es " + clase);
        }
        else if (primerByte >= 128 && primerByte <= 191){
            clase = "B";
            alert("Su IP es " + this.state.valueIP + ", su mascara de subred es " + this.state.valueMask + " y su clase IP es " + clase);
        }
        else if (primerByte >= 192 && primerByte <= 223){
            clase = "C";
            alert("Su IP es " + this.state.valueIP + ", su mascara de subred es " + this.state.valueMask + " y su clase IP es " + clase);
        }
        else {
            alert ("El IP ingresado no es aceptado");
        }
        
    }

    render(){
        return(
            <View style={styles.container}>
            <StatusBar
            barStyle="light-content"
            />
                <TextInput
                placeholder="Direccion IP (default: 192.168.0.1)" 
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                valueIP={this.state.valueIP}
                onChangeText={this.onChangeTextIP}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input} 
                />
                <TextInput
                placeholder="Mascara de Subred (default: 255.255.255.0)" 
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                valueMask={this.state.valueMask}
                onChangeText={this.onChangeTextMask}
                style={styles.input}
                />

                <TouchableOpacity 
                style={styles.buttonContainer1}>
                    <Text style={styles.buttonText} onPress={this.guardarIPyMascara} >Guardar IP y Máscara</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
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