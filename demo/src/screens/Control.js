import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button } from 'react-native'
import Slider from "react-native-slider";

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
                    
                        <Slider 
                            style={styles.sliderZ} 
                            value={this.state.valueZ} 
                            onValueChange={value => this.setState({ value })}
                            step={1}
                            minimumValue={-20}
                            maximumValue={20}
                            minimumTrackTintColor={'#ffb2f7'}
                            thumbTintColor={'#e398dc'}
                        />

                   </View>

                   <View style={styles.sliderXContainer}>

                        <Slider 
                            style={styles.sliderX} 
                            value={this.state.valueX} 
                            onValueChange={value => this.setState({ value })}
                            step={1}
                            minimumValue={-20}
                            maximumValue={20}
                            minimumTrackTintColor={'#ffb2f7'}
                            thumbTintColor={'#e398dc'}
                        />

                   </View>

                   <View style={styles.sliderRContainer}>

                        <Text>
                        Value: {this.state.value}
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotateZ:'-90deg'}]

    },
    sliderXContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
        width: 250
    },
    arrow: {

    }

});