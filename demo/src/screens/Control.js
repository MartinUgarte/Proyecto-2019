import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker } from 'react-native';
import Slider from "react-native-slider";
import { AntDesign } from '@expo/vector-icons';
import fetchTimeout from 'fetch-timeout';
import CircularSlider from '../components/CircularSlider'

import MenuButton from '../components/MenuButton'
import AddButton from '../components/AddButton'


export default class Control extends Component{

   
    constructor(){
        super()
        this.state = {

            valueZ: 0,
            lastValueZ: 0,
            valueX: 0,
            lastValueX: 0,
            valueR: 0,
            lastValueR: 0,

            //Acordarse de cambiar el valor de IP cada vez que se cambie de maquina
            valueIP: "192.168.100.16",
            valueMask: "255.255.255.0",
            brazos: ["Null"],
            pickerValue: "",
        } 
    
    }
    
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
                        }, 100)
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

            this.setState({
                brazos: requests
            });
    
            console.log(this.state.brazos);
            
        }.bind(this), 3000)        
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

    sendVerticalSlider = (lastValueZ) => {
        if (this.state.valueZ !== this.state.lastValueZ){
            this.setState({ lastValueZ });
            this.sendData("Z", this.state.valueZ);
        }
    }

    buttonVerticalSliderN = () => {
        this.setState({valueZ: this.state.valueZ-1});
        this.setState({lastValueZ: this.state.valueZ});
        this.sendData("Z", this.state.valueZ);       
    }

    buttonVerticalSliderP = () => {
        this.setState({valueZ: this.state.valueZ+1});
        this.setState({lastValueZ: this.state.valueZ});
        this.sendData("Z", this.state.valueZ);  
    }

    sendSlider = (lastValueX) => {
        if (this.state.valueX !== this.state.lastValueX){
            this.setState({ lastValueX });
            this.sendData("X", this.state.valueX);
        }
    }

    buttonSliderN = () => {
        this.setState({valueX: this.state.valueX-1});
        this.setState({lastValueX: this.state.valueX});
        this.sendData("X", this.state.valueX);
    }

    buttonSliderP = () => {
        this.setState({valueX: this.state.valueX+1});
        this.setState({lastValueX: this.state.valueX});
        this.sendData("X", this.state.valueX);
    }

    sendData = (direccion, valor) => {
        let IP = this.state.pickerValue;
        fetchTimeout('http://' + IP + ':3000/move', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                direction: direccion,
                value: valor,
            })
        }, 500)
            .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.msg === "Listo"){
                        Alert.alert("Posicion cambiada al brazo " + IP, direccion + " -> " + valor);
                    }
                })
                .catch((error) => {
                    //console.error(error);
                    Alert.alert("Brazo no encontrado", "Verifique que su brazo este encendido y conectado a la red");
                });
    }

    sendCircleSlider = (valueR) => {
        console.log("Hola");
        if (this.state.valueR !== this.state.lastValueR){
            console.log("Eje R: " + this.state.valueR);
            //this.setState({ lastValueR });
        }
    }

    render(){
        
        let IPs = this.state.brazos.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });


        return(

                <ImageBackground style={styles.container} source={require('../images/Estudio.jpg')} imageStyle={{opacity: 0.6}}>
                  <View style={styles.header}>
                        <MenuButton navigation={this.props.navigation} />
                        <Text style={styles.titulo}>Control </Text>
                  </View>
                  <MenuButton navigation={this.props.navigation} />
                  
                   <View style={styles.sliderZContainer}>
                        <AntDesign 
                            name="caretleft" 
                            size={30} 
                            color="#d14ba6" 
                            onPress={this.buttonVerticalSliderN}  
                        />

                        <Slider
                            trackStyle={customStyles4.track}
                            thumbStyle={customStyles4.thumb}
                            minimumTrackTintColor='#d14ba6'
                            minimumValue={-100}
                            maximumValue={100}
                            step={1}
                            value={this.state.valueZ}
                            onValueChange={valueZ => this.setState({ valueZ })}
                            onSlidingComplete={this.sendVerticalSlider}   
                            vertical
                            style={styles.sliderZ}                         
                        />
                        <AntDesign 
                            name="caretright" 
                            size={30} 
                            color="#d14ba6" 
                            onPress={this.buttonVerticalSliderP} 
                        />

                   </View>

                   <View style={styles.sliderXContainer}>
                        <AntDesign 
                            name="caretleft" 
                            size={30} 
                            color="#d14ba6" 
                            onPress={this.buttonSliderN}  
                        />
                        <Slider
                            trackStyle={customStyles4.track}
                            thumbStyle={customStyles4.thumb}
                            minimumTrackTintColor='#d14ba6'
                            minimumValue={-100}
                            maximumValue={100}
                            step={1}
                            value={this.state.valueX}
                            onValueChange={valueX => this.setState({ valueX })}   
                            onSlidingComplete={this.sendSlider}   
                            style={styles.sliderX}                         
                        />
                        <AntDesign 
                            name="caretright" 
                            size={30} 
                            color="#d14ba6" 
                            onPress={this.buttonSliderP} 
                        />
                   </View>
                         

                   <View style={styles.sliderRContainer}>

                        <CircularSlider 
                            width={150} 
                            height={150} 
                            meterColor='#d14ba6' 
                            textColor='#fff'
                            value={this.state.valueR} 
                            onValueChange={(value) => this.setState({valueR: value})}
                            onSlidingComplete={this.sendCircleSlider}
                        />
                        

                   </View>

                   <View style={styles.dropdown}> 
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.pickerValue}
                            onValueChange={pickerValue => this.setState({ pickerValue })}
                        >
                            {IPs}

                        </Picker>
                        <AddButton/>
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
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,        
        alignItems: 'center',
        transform: [{ rotate: '90deg' }]
    },
    sliderXContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 50,
        
    },
    sliderRContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    picker: {
        height: 30,
        width: 150,
        backgroundColor: '#d14ba6',
    },
    header: {
        flex: 0.80,
        backgroundColor: '#d14ba6',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 20,
        marginLeft: 67,
        marginTop: 20
        
    },
    axelito: {
        backgroundColor: '#d14ba6',
        borderRadius: 10,
        opacity: 0.3,
        textAlign: 'center'
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
