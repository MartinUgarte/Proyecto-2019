import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker, StatusBar } from 'react-native';
import Slider from "react-native-slider";
import { AntDesign } from '@expo/vector-icons';

import fetchTimeout from 'fetch-timeout';

import CircularSlider from 'rn-circular-slider'


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

            timer: null,
            brazos: [],
            pickerValue: global.brazos[0],
        } 
    
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
        setTimeout(function(){
            this.sendData("Z", this.state.valueZ);
        }.bind(this), 1);        
    }

    buttonVerticalSliderP = () => {
        this.setState({valueZ: this.state.valueZ+1});
        this.setState({lastValueZ: this.state.valueZ});
        setTimeout(function(){
            this.sendData("Z", this.state.valueZ);
        }.bind(this), 1);  
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
        setTimeout(function(){
            this.sendData("X", this.state.valueX);
        }.bind(this), 1); 
    }

    buttonSliderP = () => {
        this.setState({valueX: this.state.valueX+1});
        this.setState({lastValueX: this.state.valueX});
        setTimeout(function(){
            this.sendData("X", this.state.valueX);
        }.bind(this), 1);        
    }

    sendCircleSlider = (valueR, lastValueR) => {
        clearTimeout(this.state.timer);
        this.state.timer = setTimeout(function(){
            this.setState({ valueR });
            if (this.state.valueR !== this.state.lastValueR){
                this.setState({ lastValueR });
                this.sendData("R", this.state.valueR);
            }
        }.bind(this), 1);        
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
    
    render(){
        
        let IPs = global.brazos.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });            


        return(

                <ImageBackground style={styles.container} source={require('../images/fondo2.png')} imageStyle={{opacity: 0.6}}>

                <StatusBar hidden/>

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
                        <View style={styles.numeros}>
                            <Text style={styles.axelito}> ValueX: {this.state.valueX} </Text>
                            <Text style={styles.axelito}> ValueZ: {this.state.valueZ} </Text>
                            <Text style={styles.axelito}> ValueR: {this.state.valueR} </Text>
                        </View>
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
                        style={styles.halfCircleSlider}
                        step={1}
                        min={-45}
                        max={45}
                        value={this.state.valueR}
                        onChange={this.sendCircleSlider}
                        strokeWidth={10}
                        buttonBorderColor="#a4126e"
                        buttonFillColor="#f8a1d6"
                        buttonStrokeWidth={5}
                        openingRadian={Math.PI / 2}
                        buttonRadius={11}
                        radius={70}
                        backgroundTrackColor={'#a4126e'}
                        linearGradient={[{ stop: '0%', color: '#d14ba6' }, { stop: '100%', color: '#d14ba6' }]}

                        >
                    </CircularSlider>

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
        marginTop: 60,
        marginBottom: 70
        
    },
    sliderRContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sliderZ: {
        width: 150,
    },
    sliderX: {
        width: 200
    },
    halfCircleSlider: {
        marginTop: 40
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
        overflow: 'hidden',
        backgroundColor: '#eb52ba',
        borderColor: '#fff',
        borderWidth: 1.8, 
        borderRadius: 50, 
        marginLeft: 25
    },
    header: {
        flex: 0.55,
        backgroundColor: 'rgba(147,53,117,0.8)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.6,
    },
    titulo: {
        fontSize: 20,
        marginLeft: 67,
        marginTop: 10
        
    },
    axelito: {
        backgroundColor: '#d14ba6',
        borderRadius: 10,
        opacity: 0.3,
        textAlign: 'center'
    },
    numeros: {
        position: 'absolute'
    }, 
    wifiIcon: {
        zIndex: 9,
        position: 'absolute',
        top: 33,
        left: 25,
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
