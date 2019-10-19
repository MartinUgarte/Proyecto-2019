import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';

import { NavigationEvents } from 'react-navigation'

import MenuButton from '../components/MenuButton'
import ArrowLeft from '../components/ArrowLeft'


export default class Canciones extends Component{

    constructor(props){
        super(props)

        this.state = {
            bandasList: [],

            cancionesList: global.canciones,
            cancionesBandaActual: []
        }
    } 
   
    chequearCanciones(){
        this.setState({
            cancionesList: global.canciones,
        })
        for(let i = 0; i < this.state.cancionesList.length; i++){
            const res = this.state.cancionesList[i].split('.');

            if(res[0] == global.bandaActual){
                this.state.cancionesBandaActual.push(res[1])
            }
        }
    }

    render(){
        
        return(

            <View style={styles.container}>
                
                <NavigationEvents 
                    onDidFocus={() => this.chequearCanciones()}
                />

                <StatusBar hidden/>

                <View style={styles.header}>
                            <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.goBack()} >
                                <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.titulo}>Canciones</Text>
                            <MenuButton navigation={this.props.navigation} />
                </View>
                
                <View style={styles.bandaContainer}>
                        <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                        </TouchableOpacity>
                        <Text style={styles.bandaTxt}>{global.bandaActual}</Text>
                </View>

                <View style={styles.cancionesContainer}>
                    <FlatList
                        data={this.state.cancionesBandaActual}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            flexWrap: 'wrap'
                        }}
                        renderItem={({item}) =>                 
                            <View style={styles.temaContainer}>
                                <Text style={styles.temaTxt}>{item}</Text>
                                <Image style={styles.arrowImg} source={require('../images/icons/expandIcon.png')}/>
                            </View>
                        }
                        ListEmptyComponent={
                                <Text style={styles.vacioTxt}>Actualmente no tienes canciones.</Text>
                        }
                    />
                </View> 

                <View style={styles.addBtnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('NuevaCancion')}>  
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
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
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
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        borderBottomWidth: 5, 
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
    }
});

