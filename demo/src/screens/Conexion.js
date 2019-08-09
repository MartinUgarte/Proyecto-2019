import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import MenuButton from '../components/MenuButton'
import Box from '../components/Box'


export default class Conexion extends Component{

    constructor(props){

        super( props )
        this.state = {
            conectado: true

        };
    }

    toggleDiv = () => {
        Alert.alert("Se ha conectado a la red");
        const { conectado } = this.state;
        this.setState( { conectado : !conectado } )
    }

    render(){
        
        return(

                <ImageBackground style={styles.container} source={require('../images/Estudio.jpg')} imageStyle={{opacity: 0.6}}>
                  <View style={styles.header}>
                        <MenuButton navigation={this.props.navigation} />
                        <Text style={styles.titulo}>Conexión</Text>
                  </View>
                  <MenuButton navigation={this.props.navigation} />
                  
                
                   <View style={styles.textContainer}>    
                        { this.state.conectado && <Box />}
                   </View>

                   <View style={styles.wifiContainer}>
                        <AntDesign 
                            name="wifi" 
                            size={150} 
                            color="#d14ba6" 
                            onPress={this.toggleDiv}
                        />
                   </View>
                         

                   <View style={styles.footer}>
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
        flex: 0.36,
        backgroundColor: '#d14ba6',
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
        flex: 1
    }
    

});