import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, StatusBar, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation'

import MenuButton from '../components/MenuButton'


export default class Tema extends Component{

    constructor(props){
        super(props)

        this.state = {
            bordered: "",
            bandasList: global.bandas 
        }
    }

    checkActual(banda){
        if(banda == this.state.bordered){
            return true
        }
    }

    seleccionBanda(banda){
        this.setState({
            bordered: banda
        });
        global.bandaActual = banda;
    }

    mostrarImg(){
        if (global.temaNegro){
            return <Image source={require('../images/temaNegro.jpg')} style={styles.temaImage}/>
        }else{
            return <Image source={require('../images/temaBlanco.jpg')} style={styles.temaImage}/>
        }
    }

    cambiarTemaABlanco(){
        global.temaNegro = false
    }

    cambiarTemaANegro(){
        global.temaNegro = true
    }

    render(){
        
        return(

            <View style={styles.container}>
                
                <StatusBar hidden/>

                <View style={styles.header}>
                        <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.goBack(null)} >
                            <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.titulo}>Tema</Text>
                        <MenuButton navigation={this.props.navigation} />
                </View>
                
                <View style={styles.imgContainer}>
                    {this.mostrarImg()}
                  
                </View>

                <View style={styles.changeContainer}>
                <TouchableOpacity onPress={() => this.cambiarTemaABlanco()} >
                        <Image source={require('../images/icons/addIcon.png')} style={styles.changeImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.cambiarTemaANegro()} >
                        <Image source={require('../images/icons/addIcon.png')} style={styles.changeImg}/>
                    </TouchableOpacity>
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
    bandasContainer: {
        marginTop: 15,
        width: 350,
        height: 450,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imgContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    header: {
        flex: 0.4,
        backgroundColor: 'rgba(235,235,235,1)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10
    },
    titulo: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: '400'
    },  
    txtStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    addBtn: {
        width: 70,
        height: 70
    },
    addBtnContainer: {
        position: 'absolute',
        top: 560,
        left: 150,
    },
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        left: 13,
        top: 9,
        width: 50,
        height: 50
    },
    imageStyle: {
        width: 50,
        height: 50
    },
    btnStyle: {
        width: 50,
        height: 50
    },
    temaImage: {
        width: 300,
        height: 450
        
    }
});

