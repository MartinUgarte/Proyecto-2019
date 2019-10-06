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
            fetch('http://'+ global.IP + ':3000/newBand', {
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

                <View style={styles.menuIcon}>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.goBack()} >
                        <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
                    </TouchableOpacity>
                </View>
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
});

