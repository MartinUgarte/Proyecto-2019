//Importar paquetes de React Native
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Alert, Button, ActivityIndicator, CheckBox} from 'react-native';
import fetchTimeout from 'fetch-timeout';


// Clase para realizar el protocolo
export default class IPyMaskForm extends Component{

    constructor(){
        super()

        //Variables a utilizar
        this.state = {
            valueIP: "192.168.100.16",
            valueMask: "255.255.255.0"
        }
    }

    //Cambia el valor de "valueIP" a lo ingresado en el TextInput
    onChangeTextIP = (valueIP) => {
        this.setState({ valueIP });
    }

    //Cambia el valor de "valueMask" a lo ingresado en el TextInput
    onChangeTextMask = (valueMask) => {
        this.setState({ valueMask });
    }

    guardarIPyMascara = () => {
        //IPByte es un array que guarda string de la IP, separandolos por el punto
        var IPByte = this.state.valueIP.split(".");
        //MaskByte es un array que guarda string de la Mascara de subred, separandolos por el punto
        var MaskByte = this.state.valueMask.split(".");
        //Convierte el primer byte de la IP en un int

        var primerByteIP = parseInt(IPByte[0]);
        var segundoByteIP = parseInt(IPByte[1]);
        var tercerByteIP = parseInt(IPByte[2]);
        var cuartoByteIP = parseInt(IPByte[3]);
        var primerByteMask = parseInt(MaskByte[0]);
        var segundoByteMask = parseInt(MaskByte[1]);
        var tercerByteMask = parseInt(MaskByte[2]);
        var cuartoByteMask = parseInt(MaskByte[3]);

        var mascaraSubredPrimerByte = primerByteIP & primerByteMask;
        var mascaraSubredSegundoByte = segundoByteIP & segundoByteMask;
        var mascaraSubredTercerByte = tercerByteIP & tercerByteMask;
        var mascaraSubredCuartoByte = cuartoByteIP & cuartoByteMask;

        var hostsPosiblesPrimerByte = 255 - primerByteMask;
        var hostsPosiblesSegundoByte = 255 - segundoByteMask;
        var hostsPosiblesTercerByte = 255 - tercerByteMask;
        var hostsPosiblesCuartoByte = 255 - cuartoByteMask;

        var ipHostSegundoByte;
        var ipHostTercerByte;
        var ipHostCuartoByte; 
        
        let requests = [];

        
        for (var i = 0; i <= hostsPosiblesSegundoByte; i++){
            ipHostSegundoByte = mascaraSubredSegundoByte + i;
            for (var j = 0; j <= hostsPosiblesTercerByte; j++){
                ipHostTercerByte = mascaraSubredTercerByte + j;
                for (var k = 0; k <= hostsPosiblesCuartoByte; k++){
                    ipHostCuartoByte = mascaraSubredCuartoByte + k;

                        fetchTimeout('http://' + primerByteIP.toString() + "." + ipHostSegundoByte.toString() + "." + ipHostTercerByte.toString() + "." + ipHostCuartoByte.toString() + ':3000/server', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                msg: 'Sos el servidor?',
                                ipEnviado: primerByteIP.toString() + "." + ipHostSegundoByte.toString() + "." + ipHostTercerByte.toString() + "." + ipHostCuartoByte.toString()
                            })
                        }, 500)
                            .then((response) => response.json())
                                .then((responseJson) => {
                                    if(responseJson.msg === "Si"){
                                        req = new Promise(function (resolve, reject) {
                                            resolve({
                                                ip: responseJson.direccionIP
                                            })
                                        })
                                        req.then(function(value) {
                                            requests.push(value.ip);
                                        });
                                    }
                                })
                                .catch((error) => {
                                    //console.error(error);
                                });
                }
            }
        }

        setTimeout(function(){
            if (requests.length === 0){
                Alert.alert("No hay servidores en la red", "Verifique que los servidores esten encendidos y conectados a la red o si usted se encuentra en la misma red");
            }
            else{
                Promise.all(requests).then(() => {
                    var servidores = null;
                    for (var i = 0; i < requests.length; i++){
                        if (requests.length === 1){
                            Alert.alert("Servidor encontrado", requests[i]);
                        }
                        else{
                            if (servidores === null){
                                servidores = requests[i];
                            }
                            else {
                                servidores = servidores + " y " + requests[i];
                            }
                        }
                    }
                    if (servidores !== null){
                        Alert.alert("Servidores encontrados", servidores);
                    }
                })
            }
        }, 500)

    }

    
    //Función que obtiene la IP y la Mascara de subred
    /*guardarIPyMascara = () => {
        //IPByte es un array que guarda string de la IP, separandolos por el punto
        var IPByte = this.state.valueIP.split(".");
        //MaskByte es un array que guarda string de la Mascara de subred, separandolos por el punto
        var MaskByte = this.state.valueMask.split(".");
        //Convierte el primer byte de la IP en un int
        var primerByteIP = parseInt(IPByte[0]);
        
        //Verificador de clase de la IP-------------------------------------------------------------------
        var clase;
        if (primerByteIP >= 0 && primerByteIP <= 127){
            clase = "A";
            alert("Su IP es " + this.state.valueIP + ", su mascara de subred es " + this.state.valueMask + " y su clase IP es " + clase);
        }
        else if (primerByteIP >= 128 && primerByteIP <= 191){
            clase = "B";
            alert("Su IP es " + this.state.valueIP + ", su mascara de subred es " + this.state.valueMask + " y su clase IP es " + clase);
        }
        else if (primerByteIP >= 192 && primerByteIP <= 223){
            clase = "C";
            alert("Su IP es " + this.state.valueIP + ", su mascara de subred es " + this.state.valueMask + " y su clase IP es " + clase);
        }
        else {
            alert ("El IP ingresado no es aceptado");
        }
        //Verificador de clase de la IP-------------------------------------------------------------------
        
        
    
        fetchTimeout('http://192.168.100.17:3000/server', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                msg: 'Sos el servidor?',
                ipEnviado: "192.168.100.17"
            })
        }, 500)
            .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.msg === "Si"){
                        Alert.alert("Direccion IP del Servidor", responseJson.direccionIP);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
    }*/

    //Lo que se ve en la pantalla
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