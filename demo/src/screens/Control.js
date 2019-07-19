import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker, PanResponder } from 'react-native';
import Slider from "react-native-slider";
import { AntDesign } from '@expo/vector-icons';
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
            valueIP: "192.168.100.16",
            valueMask: "255.255.255.0",
            brazos: ["Hola"],
            pickerValue: "",
        } 
    
    }
/*
    //Martin si no queres que te jodan los alerts, comenta esto
    componentDidMount(){
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

    handleChange = value => {
        console.log(`Changed value ${value}`);
        this.setState({ valueR });
    };
 
    handleChangeRange = event => {
        this.setState({
            valueR: event.target.valueAsNumber,
        });
    };

    sendVerticalSlider = (valueZ) => {
        this.setState({ valueZ });
        console.log(this.state.valueZ);
        let IP = this.state.pickerValue;
        console.log(IP);
        if (IP !== "Brazos Roboticos"){
            fetchTimeout(IP + ':3000/z', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    direction: "Z",
                    value: this.state.valueZ,
                })
            }, 10)
                .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.msg === "Listo"){
                            console.log("Posicion cambiada al brazo " + IP + ": Z -> " + this.state.valueZ);
                        }
                    })
                    .catch((error) => {
                        //console.error(error);
                        Alert.alert("Brazo no encontrado", "Verifique que su brazo este encendido y conectado a la red");
                    });
        }
    }

    sendSlider = (valueX) => {
        this.setState({ valueX });
        console.log(this.state.valueX);
        let IP = this.state.pickerValue;
        console.log(IP);
        if (IP !== "Brazos Roboticos"){
            fetchTimeout(IP + ':3000/x', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    direction: "X",
                    value: this.state.valueX,
                })
            }, 10)
                .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.msg === "Listo"){
                            console.log("Posicion cambiada al brazo " + IP + ": X -> " + this.state.valueX);
                        }
                    })
                    .catch((error) => {
                        //console.error(error);
                        Alert.alert("Brazo no encontrado", "Verifique que su brazo este encendido y conectado a la red");
                    });
        }
    }

    sendCircleSlider = (valueR) => {
        /*this.setState({ valueR });
        console.log(this.state.valueR);
        let IP = this.state.pickerValue;
        console.log(IP);
        if (IP !== "Brazos Roboticos"){
            fetchTimeout(IP + ':3000/r', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    direction: "R",
                    value: this.state.valueR,
                })
            }, 10)
                .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.msg === "Listo"){
                            console.log("Posicion cambiada al brazo " + IP + ": R -> " + this.state.valueR);
                        }
                    })
                    .catch((error) => {
                        //console.error(error);
                        Alert.alert("Brazo no encontrado", "Verifique que su brazo este encendido y conectado a la red");
                    });
        }*/
    //}
    
    componentWillMount () {
        this._panResponder = PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true
        })
    }

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
                        <Slider
                            _panResponder
                            trackStyle={customStyles4.track}
                            thumbStyle={customStyles4.thumb}
                            minimumTrackTintColor='#d14ba6'
                            minimumValue={-100}
                            maximumValue={100}
                            step={1}
                            value={this.state.valueZ}
                            onValueChange={valueZ => this.setState({ valueZ })}   
                            style={styles.sliderZ}                         
                        />

                   </View>

                   <View style={styles.sliderXContainer}>
                        <AntDesign name="caretleft" size={30} color="#d14ba6" onPress={() => this.setState({valueX:this.state.valueX-1})}  />
                        <Slider
                            trackStyle={customStyles4.track}
                            thumbStyle={customStyles4.thumb}
                            minimumTrackTintColor='#d14ba6'
                            minimumValue={-100}
                            maximumValue={100}
                            step={1}
                            value={this.state.valueX}
                            onValueChange={valueX => this.setState({ valueX })}   
                            style={styles.sliderX}                         
                        />
                        <AntDesign name="caretright" size={30} color="#d14ba6" onPress={() => this.setState({valueX:this.state.valueX+1})} />
                   </View>
                         

                   <View style={styles.sliderRContainer}>
                        <Text>
                        ValueX: {this.state.valueX} mm 
                        </Text>
                   </View>

                   <View style={styles.dropdown}> 
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.pickerValue}
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
        transform: [
            { rotateZ : '-90deg' },
        ],

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
        width: 100
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
        backgroundColor: '#d14ba6',
        marginBottom: 20,
    },
    header: {
        flex: 0.65,
        backgroundColor: '#d14ba6'
    }
});

var customStyles4 = StyleSheet.create({
    track: {
      height: 10,
      borderRadius: 4,
      backgroundColor: '#a4126e',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 1},
      shadowRadius: 1,
      shadowOpacity: 0.15,
    },
    thumb: {
      width: 25,
      height: 25,
      backgroundColor: '#f8a1d6',
      borderColor: '#a4126e',
      borderWidth: 5,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 2,
      shadowOpacity: 0.35,
    }
  });
