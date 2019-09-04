import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, StatusBar } from 'react-native'

export default class Inicio extends Component{

    constructor(props){
        super(props);
        global.brazos = ["Null"];
    }

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };

    render(){
        return(

                <ImageBackground style={styles.container} source={require('../images/fondo.png')} imageStyle={{opacity: 1}}>
                  
                <StatusBar barStyle='light-content' />

                    <View style={styles.titleView}>
                        <Text style={styles.title}>MYCROTECH</Text>
                        <Image style={styles.logo} source={require('../images/Micro2.png')} />
                    </View>

                    <View style={styles.textView}>          
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Login')}>  
                            <Text style = {styles.txtBtn}>Iniciar Sesión</Text>   
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Register')}>  
                            <Text style = {styles.txtBtn}>Registrarse </Text>   
                        </TouchableOpacity>
                    </View>


                    <View style={styles.buttonView}>  
                            
                        <TouchableOpacity style={styles.sobreNostrosView} onPress={() => this.props.navigation.navigate('SobreNosotros')}>  
                                <Text style = {styles.txtSobreNosotros}>Sobre Nosotros</Text>   
                        </TouchableOpacity>
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
    titleView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end', 
    },
 
    textView: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 40,
        color: '#fff',
    //    fontFamily: 'sans-serif'
    },
    logo: {
        marginTop: 20,
        width: 130,
        height: 130
    },
    btn: {
        height: 40,
        width: 230,
        marginTop: 16,
        overflow: 'hidden',
        borderColor: '#fff',
        borderRadius: 50,
        borderWidth: 1.8, 
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85
    },
    sobreNostrosView: {
        marginBottom: 23,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    txtBtn: {
        fontSize: 20,
        color: '#fff',
    },
    txtSobreNosotros: {
        fontSize: 17,
        color: '#fff',
        opacity: 0.85
    }
});