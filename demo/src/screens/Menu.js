import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { NavigationEvents } from 'react-navigation'

import MenuButton from '../components/MenuButton'


export default class Menu extends Component{
    constructor(props){

        super( props );
        this.state = {
            bandaSelect: "",
            temaNegro: false 

        };
    }

    render(){
        
        return(
            <View style={this.state.temaNegro ? styles.darkContainer : styles.container}>

                <NavigationEvents
                    onDidFocus={() => this.setState({
                        bandaSelect: global.bandaActual,
                        temaNegro: global.temaNegro
                    })}
                />

                <StatusBar hidden/>

                <View style={styles.header}>
                        <Text style={styles.titulo}>{global.nombre}</Text>
                        <MenuButton navigation={this.props.navigation} />
                </View>
                
                <View style={styles.fondoEstudio}>
                    <Image source={require('../images/fondoPerfil.png')} style={this.state.temaNegro ? styles.darkEstudioImg : styles.estudioImg} />
                </View>

                <View style={this.state.temaNegro ? styles.fondoNegro : styles.fondoBlanco}>

                </View>

                <View style={styles.btnsContainer}>
                    <View style={styles.duoContainer}>
                        <TouchableOpacity style={this.state.temaNegro ? styles.darkCartContainer : styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                            <Image source={require('../images/icons/controlIcon.png')} style={styles.iconsStyle}/>
                            <Text style={styles.txtStyle}>Control</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.temaNegro ? styles.darkCartContainer : styles.cartContainer} onPress={() => this.props.navigation.navigate('Bandas')}>
                            <Image source={require('../images/icons/sesionesIcon.png')} style={styles.iconsStyle}/>
                            <Text style={styles.txtStyle}>Bandas</Text>    
                        </TouchableOpacity>
                    </View>
                    <View style={styles.duoContainer}>
                        <TouchableOpacity style={this.state.temaNegro ? styles.darkCartContainer : styles.cartContainer} onPress={() => this.props.navigation.navigate('Canciones')}>
                            <Image source={require('../images/icons/notaIcon.png')} style={styles.iconsStyle}/>
                            <Text style={styles.txtStyle}>Canciones</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.temaNegro ? styles.darkCartContainer : styles.cartContainer} onPress={() => this.props.navigation.navigate('Tema')}  >
                            <Image source={require('../images/icons/colorIcon.png')} style={styles.iconsStyle}/>
                            <Text style={styles.txtStyle}>Tema</Text>    
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
    darkContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000'

    },
    btnsContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        top: '10%',
    },
    duoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15
    },
    cartContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 170,
        height: 170,
        borderBottomWidth: 4,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(0,0,0,0.14)',
        borderRadius: 10  
    },
    darkCartContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 170,
        height: 170,
        borderBottomWidth: 8,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: 'rgba(235,235,235,0.14)',
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
    fondoNegro: {
        flex: 1.1,
        backgroundColor: 'black'
    },
    header: {
        flex: 0.248,
        backgroundColor: 'rgba(170,170,170,1)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: '400'
    },  
    estudioImg: {
        width: 430,
        height: 285,
        opacity: .55
    },
    darkEstudioImg: {
        width: 430,
        height: 285,
    },
    iconsStyle: {
        height: 70,
        width: 70,
    },
    txtStyle: {
        fontSize: 20,
        color: '#A2A2A2'
    },
    bandaActualContainer: {
        position: 'absolute',
        top: '54%',
        left: '56%',
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

