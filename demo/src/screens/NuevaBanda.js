import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Button, Alert, Picker, StatusBar } from 'react-native';

import MenuButton from '../components/MenuButton'
import ArrowLeft from '../components/ArrowLeft'

export default class NuevaBanda extends Component{

    constructor(props){

        super( props );
        this.state = {
            band: "",
        };
    }

    newBand = () => {
        if (this.state.band === ""){
            Alert.alert("Error", "No se indicó el nombre de la banda");
        }
        else{
            fetch('http://192.168.0.11:3000/newBand', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: global.nombre,
                    band: this.state.band,
                })
            })
            .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.msg === "Listo"){
                        global.bandas.push(this.state.band);
                        Alert.alert("Banda agregada existosamente");
                    }
                    else if(responseJson.msg === "Banda ya existente"){
                        Alert.alert("ERROR", "Ya existe una banda con ese nombre");
                    }
                    else if(responseJson.msg === "Error, usuario"){
                        Alert.alert("ERROR", "El usuario no existe");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });  
        }
    }

    onChangeBand = (band) => {
        this.setState({ band });
    }

    render(){
        
        return(

            <View style={styles.container}>

                <StatusBar hidden/>

                <ArrowLeft onPress={() => this.props.navigation.goback()}/>
                <View style={styles.header}>
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
                        band={this.state.band}
                        onChangeText={this.onChangeBand}
                    />
                </View>
                <View style={styles.noseContainer}>

                </View>
                <View style={styles.hechoContainer}>
                        <TouchableOpacity style={styles.btn} onPress={this.newBand}>  
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
        justifyContent: 'center',
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

