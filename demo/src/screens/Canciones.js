import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker, StatusBar } from 'react-native';

import MenuButton from '../components/MenuButton'
import ArrowLeft from '../components/ArrowLeft'


export default class Canciones extends Component{

    constructor(props){
        super(props)

        this.state = {
            bandasList: []
        }
    } 
   
    render(){
        
        return(

            <View style={styles.container}>

                <StatusBar hidden/>

                <View style={styles.header}>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width: 40, height: 40}}>
                                <ArrowLeft/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.titulo}>Canciones</Text>
                        </View>
                </View>
                <MenuButton navigation={this.props.navigation} />
                
                <View style={styles.bandaContainer}>
                        <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                        </TouchableOpacity>
                        <Text style={styles.bandaTxt}>Cuarteto de nos</Text>
                </View>

                <View style={styles.cancionesContainer}>
                    <View style={styles.temaContainer}>
                        <Text style={styles.temaTxt}>No llora</Text>
                        <Image style={styles.arrowImg} source={require('../images/icons/expandIcon.png')}/>
                    </View>
                    <View style={styles.temaContainer}>
                        <Text style={styles.temaTxt}>Lo malo de ser bueno</Text>
                        <Image style={styles.arrowImg} source={require('../images/icons/expandIcon.png')}/>
                    </View>
                    <View style={styles.temaContainer}>
                        <Text style={styles.temaTxt}>Me amo</Text>
                        <Image style={styles.arrowImg} source={require('../images/icons/expandIcon.png')}/>
                    </View>
                </View>

                <View style={styles.addBtnContainer}>
                    <TouchableOpacity style={styles.btn}>  
                            <Text style = {styles.txtBtn}>Agregar</Text>   
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
    bandaContainer: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-around',
       alignItems: 'center',
    },
    cancionesContainer: {
       flex: 2
    },
    cartContainer: {
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: 'rgba(168,37,116,1)',
        width: 100,
        height: 100,
        borderBottomWidth: 4,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(0,0,0,0.14)',
        borderRadius: 90
    },
    temaContainer: {
        borderTopWidth: 2,
        borderColor: 'rgba(44,44,44,0.6)',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center'
        
    },
    header: {
        flex: 0.4,
        backgroundColor: 'rgba(235,235,235,1)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        marginLeft: 80,
        marginTop: 10,
        fontWeight: '400'
    },  
    txtStyle: {
        fontSize: 20,
        color: 'white'
    },
    addBtn: {
        width: 70,
        height: 70
    },
    addBtnContainer: {
        position: 'absolute',
        top: 560,
        left: 70,
    },
    btn: {
        height: 50,
        width: 230,
        marginTop: 16,
        overflow: 'hidden',
        borderColor: '#fff',
        borderRadius: 50,
        borderWidth: 1.8, 
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85
    },
    txtBtn: {
        fontSize: 20,
        color: '#fff',
    },
    bandaTxt: {
        fontSize: 20,
        fontWeight: '200',
        textAlign: 'center',
        marginRight: 35
    },
    temaTxt: {
        fontSize: 20,
        fontWeight: '300'
    },
    arrowImg: {
        width: 30,
        height: 30,
    }
});

