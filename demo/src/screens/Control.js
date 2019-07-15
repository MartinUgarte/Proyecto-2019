import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker } from 'react-native';
import Slider from "react-native-slider";
import { AntDesign } from '@expo/vector-icons';
import VerticalSlider from 'rn-vertical-slider'
import fetchTimeout from 'fetch-timeout';
import CircleSlider from '../components/CircleSlider'

import MenuButton from '../components/MenuButton'


export default class Control extends Component{

   
    constructor(){
        super()
 
        this.state = {
            valueZ: 0,
            valueX: 0,
            valueR: 0,

            startAngle: 0.7,
            angleLength: 3.1416,

            //Acordarse de cambiar el valor de IP cada vez que se cambie de maquina
            valueIP: "10.8.17.8",
            valueMask: "255.255.255.0",
            brazos: ["Hola"],
        } 
    
    }

    //Martin si no queres que te jodan los alerts, comenta esto
    /*componentDidMount(){
        //IPByte es un array que guarda string de la IP, separandolos por el punto
        var IPByte = this.state.valueIP.split(".");
        //MaskByte es un array que guarda string de la Mascara de subred, separandolos por el punto
        var MaskByte = this.state.valueMask.split(".");
        //Convierte el primer byte de la IP en un int

        Alert.alert("Buscando Brazos...", "Espere por favor");

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

        requests.push("Brazos Roboticos");

        
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
                        }, 10)
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
                requests.push("No hay brazos conectados");
            }
            else{
                Promise.all(requests).then(() => {
                    var servidores = null;
                    for (var i = 0; i < requests.length; i++){
                        if (requests.length === 2){
                            Alert.alert("Servidor encontrado", requests[1]);
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
                        Alert.alert("Servidores encontrados", servidores);
                    }
                })
            }

            this.setState({
                brazos: requests
            });
    
            console.log(this.state.brazos);
        }.bind(this), 1)

        
    }
*/
    handleChange = value => {
        console.log(`Changed value ${value}`);
        this.setState({ valueR });
    };
 
    handleChangeRange = event => {
        this.setState({
            valueR: event.target.valueAsNumber,
        });
    };

    render(){
        
        let IPs = this.state.brazos.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });


        return(

                <ImageBackground style={styles.container} source={require('../images/Estudio.jpg')} imageStyle={{opacity: 0.6}}>
                  
                  <View style={styles.header}>
                        <MenuButton navigation={this.props.navigation} />
                  </View>

                  <MenuButton navigation={this.props.navigation} />
                  
                   <View style={styles.sliderZContainer}>
                        <VerticalSlider
                                    disabled={false}
                                    min={0}
                                    max={100}
                                    value={this.state.valueR} 
                                    onValueChange={valueR => this.setState({ valueR })}
                                    width={10}
                                    height={200}
                                    step={1}
                                    borderRadius={5}
                                    minimumTrackTintColor={"gray"}
                                    maximumTrackTintColor={"tomato"}
                                    showBallIndicator
                                    ballIndicatorColor={"gray"}
                                    ballIndicatorTextColor={"white"}
                        />
                   </View>

                   <View style={styles.sliderXContainer}>
                        <AntDesign name="caretleft" size={30} color="green" onPress={() => this.setState({valueX:this.state.valueX-1})}  />
                        <Slider 
                            style={styles.sliderX} 
                            value={this.state.valueX} 
                            onValueChange={valueX => this.setState({ valueX })}
                            step={1}
                            minimumValue={-100}
                            maximumValue={100}
                            minimumTrackTintColor={'#ffb2f7'}
                            thumbTintColor={'#e398dc'}
                        />
                        <AntDesign name="caretright" size={30} color="green" onPress={() => this.setState({valueX:this.state.valueX+1})} />
                   </View>
                         

                   <View style={styles.sliderRContainer}>
                        <CircleSlider
                        value={100}
                        />
                   </View>

                   <View style={styles.dropdown}> 
                        <Picker
                            style={styles.picker}
                            itemStyle={{ color: 'rgb(255, 255, 255)' }}
                        >
                            {IPs}

                        </Picker>
                    </View> 
             
                </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000'

    },
    sliderZContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
        alignItems: 'center',

    },
    sliderXContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    sliderRContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderZ: {
        width: 150,
    },
    sliderX: {
        width: 200
    },
    arrowImage: {
        width: 30,
        height: 30
    },
    semicirculo: {
        
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        backgroundColor: '#FF00FF',
        
    },
    dropdown: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    picker: {
        height: 50,
        width: 240,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    header: {
        flex: 0.5,
        backgroundColor: '#DBB5F8'
    }
});
