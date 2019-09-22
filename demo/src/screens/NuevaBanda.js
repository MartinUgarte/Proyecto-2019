import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Button, Alert, Picker, StatusBar } from 'react-native';

import MenuButton from '../components/MenuButton'
import ArrowLeft from '../components/ArrowLeft'

export default class NuevaBanda extends Component{

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
                
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nombre" 
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        returnKeyType="next"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.formStyle}
                    />
                </View>
                <View style={styles.noseContainer}>

                </View>
                <View style={styles.hechoContainer}>
                        <TouchableOpacity style={styles.btn}>  
                            <Text style = {styles.txtBtn}>Hecho</Text>   
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
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noseContainer: {
        flex: 1
    },
    hechoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
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
        left: 150,
    },
    formStyle: {
        backgroundColor: '#fff',
        width: 250,
        borderBottomWidth: 3,
        borderBottomColor: '#A82574'
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
});

