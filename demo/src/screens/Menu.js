import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker, StatusBar } from 'react-native';
import { NavigationEvents } from 'react-navigation'



import MenuButton from '../components/MenuButton'


export default class Menu extends Component{
    constructor(props){

        super( props );
        this.state = {
            bandaSelect: ""

        };
    }

    render(){
        
        return(
            <View style={styles.container}>
                <NavigationEvents
                    onDidFocus={() => this.setState({
                        bandaSelect: global.bandaActual
                    })}
                />

                <StatusBar hidden/>

                <View style={styles.header}>
                        <Text style={styles.titulo}>{global.nombre}</Text>
                </View>
                <MenuButton navigation={this.props.navigation} />
                
                <View style={styles.fondoEstudio}>
                    <Image source={require('../images/fondoPerfil.png')} style={styles.estudioImg} />
                </View>

                <View style={styles.fondoBlanco}>

                </View>

                <View style={styles.btnsContainer}>
                    <View style={styles.duoContainer}>
                        <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                            <Image source={require('../images/icons/controlIcon.png')} style={styles.iconsStyle}/>
                            <Text style={styles.txtStyle}>Control</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Bandas')}>
                            <Image source={require('../images/icons/sesionesIcon.png')} style={styles.iconsStyle}/>
                            <Text style={styles.txtStyle}>Bandas</Text>    
                        </TouchableOpacity>
                    </View>
                    <View style={styles.duoContainer}>
                        <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Canciones')}>
                            <Image source={require('../images/icons/notaIcon.png')} style={styles.iconsStyle}/>
                            <Text style={styles.txtStyle}>Canciones</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Login')}  >
                            <Image source={require('../images/icons/colorIcon.png')} style={styles.iconsStyle}/>
                            <Text style={styles.txtStyle}>Color</Text>    
                        </TouchableOpacity>
                    </View>
                </View>

                
                <View style={styles.bandaActualContainer}>
                    <Text style={styles.bandaTxt}>{this.state.bandaSelect}</Text>
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
    btnsContainer: {
        width: 350,
        height: 350,
        flexDirection: 'column',
        justifyContent: 'space-around',
        position: 'absolute',
        top: 250,
    },
    duoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cartContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 150,
        height: 150,
        borderBottomWidth: 4,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(0,0,0,0.14)',
        borderRadius: 10
        
    },
    fondoEstudio: {
        flex: .7,
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fondoBlanco: {
        flex: 1.1,
        backgroundColor: 'white'
    },
    header: {
        flex: 0.248,
        backgroundColor: 'rgba(235,235,235,1)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: '400'
    },  
    estudioImg: {
        width: 365,
        height: 220,
        opacity: .55
    },
    iconsStyle: {
        height: 55,
        width: 55,
    },
    txtStyle: {
        fontSize: 20,
        color: '#A2A2A2'
    },
    bandaActualContainer: {
        position: 'absolute',
        top: 380,
        left: 185,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    bandaTxt: {
        fontSize: 15,
        color: 'rgb(168,37,116)',
        textAlign: 'center'
    }

});

