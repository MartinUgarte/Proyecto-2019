import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';

import MenuButton from '../components/MenuButton'
import ArrowLeft from '../components/ArrowLeft'


export default class Bandas extends Component{

    constructor(props){
        super(props)
    }

    render(){
        
        return(

            <View style={styles.container}>

                <StatusBar hidden/>

                <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width: 40, height: 40}}>
                            <ArrowLeft/>
                        </TouchableOpacity>
                        <Text style={styles.titulo}>Bandas</Text>
                </View>
                <MenuButton navigation={this.props.navigation} />
                
                <View style={styles.bandasContainer}>
                    <FlatList
                        data={global.bandas}
                        renderItem={({item}) =>
                            <View style={styles.duoContainer}>
                                    <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                                        <Text style={styles.txtStyle}>{item}</Text>     
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                                        <Text style={styles.txtStyle}>{item}</Text>     
                                    </TouchableOpacity>
                            </View>
                        }
                        ListEmptyComponent={
                                <Text style={styles.vacioTxt}>Actualmente no tienes bandas.</Text>
                        }
                        />
                    
                    {/*
                    {global.bandas.map(nombre => (
                        <View style={styles.duoContainer}>
                            <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                            <Text style={styles.txtStyle}>{global.bandas}</Text>    
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                            <Text style={styles.txtStyle}>{global.bandas}</Text>    
                            </TouchableOpacity>
                        </View>
                    ))}
                    */}
                </View>

                <View style={styles.addBtnContainer} >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NuevaBanda')} >
                        <Image source={require('../images/icons/addIcon.png')} style={styles.addBtn}/>
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
    duoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5
    },
    cartContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(168,37,116,1)',
        width: 138,
        height: 138,
        borderBottomWidth: 4,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(0,0,0,0.14)',
        borderRadius: 90
        
    },
    vacioContainer: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
    vacioTxt: {
        fontSize: 20,
        textAlign: 'center'
    },
    header: {
        flex: 0.42,
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
    }
});
