import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker, ActivityIndicator, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import MenuButton from '../components/MenuButton';

import fetchTimeout from 'fetch-timeout';


export default class Conexion extends Component{

    constructor(props){

        super( props );
        this.state = {
            conectado: false,
            buscado: false,
            llamados: 0,

            //Acordarse de cambiar el valor de IP cada vez que se cambie de maquina
            valueIP: "10.10.32.65",
            valueMask: "255.255.255.0",

        };
    }

    comprobarConectividad = () => {
        if(this.state.conectado){
            //Alert.alert("Se ha conectado a la red");
            return <Text style={styles.conectividadTxt}>Se ha conectado a la red</Text>
        }else{
            //Alert.alert("Se ha desconectado de la red");
            return <Text style={styles.conectividadTxt}>Sin conexión</Text>
        }
    }

    conectar = () => {
        this.setState({ 
            conectado: !this.state.conectado,
            buscado: false
        });
        setTimeout(function(){
            if(this.state.conectado){   
                this.state.llamados++;
                if (this.state.llamados == 1){
                    this.buscarBrazosBackEnd();
                }
                else{
                    this.setState({ llamados: 0 })
                }             
            }
        }.bind(this), 1)
    }

    buscarBrazosBackEnd = () => {
        //IPByte es un array que guarda string de la IP, separandolos por el punto
        var IPByte = this.state.valueIP.split(".");
        //MaskByte es un array que guarda string de la Mascara de subred, separandolos por el punto
        var MaskByte = this.state.valueMask.split(".");
        //Convierte el primer byte de la IP en un int

        //Alert.alert("Buscando Brazos...", "Espere por favor");

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

                        fetchTimeout('http://' + primerByteIP.toString() + "." + ipHostSegundoByte.toString() + "." + ipHostTercerByte.toString() + "." + ipHostCuartoByte.toString() + ':80/server', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                msg: 'Sos el servidor?',
                                ipEnviado: primerByteIP.toString() + "." + ipHostSegundoByte.toString() + "." + ipHostTercerByte.toString() + "." + ipHostCuartoByte.toString()
                            })
                        }, 3000)
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
                this.setState({ verificar: true });
                Alert.alert("No hay brazos en la red", "Verifique que los brazos esten encendidos y conectados a la red o si usted se encuentra en la misma red");
                requests.push("Empty");
            }
            else{
                Promise.all(requests).then(() => {
                    this.setState({ verificar: true });
                    var servidores = null;
                    for (var i = 0; i < requests.length; i++){
                        if (requests.length === 1){
                            Alert.alert("Brazo encontrado", requests[0]);
                        }
                        else{
                            if (requests[i] !== "Brazos Roboticos"){
                                if (servidores === null){
                                    servidores = requests[i];
                                }
                                else {
                                    servidores = servidores + " y " + requests[i];
                                }
                            }
                        }
                    }
                    if (servidores !== null){
                        Alert.alert("Brazos encontrados", servidores);
                    }
                })
            }

            global.brazos = requests;
            
            this.setState({
                buscado: true,
                llamados: 0
            });

            if (requests[0] != "Empty"){
                this.props.navigation.navigate('Control');
            }
            
        }.bind(this), 5000)
    }

    buscarBrazosFrontEnd = () => {
        if(this.state.conectado && this.state.buscado == false){
            return (
                <View>
                    <Text style={styles.buscandoBrazosTxt}>Buscando brazos robóticos...</Text>
                    <ActivityIndicator size="large" color="#d14ba6" />
                </View>
            )
        }
    }

    render(){
        
        return(

                <View style={styles.container} imageStyle={{opacity: 1}}>

                    <StatusBar hidden/>

                  <View style={styles.header}>
                        <MenuButton navigation={this.props.navigation} />
                        <Text style={styles.titulo}>Conexión</Text>
                  </View>
                  <MenuButton navigation={this.props.navigation} />
                  
                
                
                   <View style={styles.textContainer}>    
                        { this.comprobarConectividad()}                        
                   </View>

                   <View style={styles.wifiContainer}>
                        <AntDesign 
                            name="wifi" 
                            size={150} 
                            color="#d14ba6" 
                            onPress={this.conectar}
                        />
                   </View>
                         
                   <View style={styles.footer}>
                        { this.buscarBrazosFrontEnd()} 
                   </View>
             
                </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'

    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 60,
        marginBottom: 70
        
    },
    wifiContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    header: {
        flex: 0.46,
        backgroundColor: 'rgba(235,235,235,1)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
 
    },
    titulo: {
        fontSize: 20,
        marginLeft: 67,
        marginTop: 10
        
    },
    numeros: {
        position: 'absolute'
    }, 
    wifiIcon: {
        zIndex: 9,
        position: 'absolute',
        top: 33,
        left: 20,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 60,
        marginBottom: 70
    },
    conectividadTxt: {
        fontSize: 25,
        color: 'black'
    },
    buscandoBrazosTxt: {
        fontSize: 20,
        color: 'black',
        opacity: 0.7
    }
    

});