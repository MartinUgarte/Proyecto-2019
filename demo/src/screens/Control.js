import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button } from 'react-native'
import Slider from "react-native-slider";
import { AntDesign } from '@expo/vector-icons'

export default class Control extends Component{

    static navigationOptions = {
        title: 'Control ',
        headerStyle: {
            backgroundColor: '#FC4AF5',
        },
 
    };

    constructor(){
        super()
 
        this.state = {
            valueZ: 0,
            valueX: 0,
            valueR: 0
        } 
    
    }

    render(){
        return(

                <ImageBackground style={styles.container} source={require('../images/Estudio.jpg')} imageStyle={{opacity: 0.6}}>
                  
                   <View style={styles.sliderZContainer}>
                    
                        <AntDesign name="caretleft" size={30} color="green" onPress={() => this.setState({valueZ:this.state.valueZ-1})}  />

                        <Slider 
                            style={styles.sliderZ} 
                            value={this.state.valueZ} 
                            onValueChange={valueZ => this.setState({ valueZ })}
                            step={1}
                            minimumValue={-100}
                            maximumValue={100}
                            minimumTrackTintColor={'#ffb2f7'}
                            thumbTintColor={'#e398dc'}
                        />

                        <AntDesign name="caretright" size={30} color="green" onPress={() => this.setState({valueZ:this.state.valueZ+1})}  />


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

                        <Text>
                        ValueX: {this.state.valueX} mm 
                        </Text>
                        <Text>
                        ValueZ: {this.state.valueZ} mm 
                        </Text>

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
        transform: [{rotateZ:'-90deg'}]

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
        
    }

});