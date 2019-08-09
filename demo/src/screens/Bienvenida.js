import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native'

export default class Bienvenida extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,   
    };

    render(){
        return(

                <ImageBackground style={styles.container} source={require('../images/Estudio.jpg')} imageStyle={{opacity: 0.6}}>
                  
                    <View style={styles.titleView}>
                        <Text style={styles.title}>MYCROTECH</Text>
                        <Image style={styles.logo} source={require('../images/Micro2.png')} />

                    </View>

                    <View style={styles.textView}>  
                            <Text style={styles.txtWelcome}>¡Bienvenido, Gustavo! .</Text>     
                            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Conexion')}>  
                            <Text style = {styles.txtBtn}>Continuar </Text>   
                            </TouchableOpacity>
                    </View>


                    <View style={styles.buttonView}>  
                            <Text style={styles.txtChange}>Cambiar de usuario .</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'   
    },
    title: {
        fontSize: 40,
        color: '#fff',
   //     fontFamily: 'sans-serif'
    },
    logo: {
        marginTop: 20,
        width: 100,
        height: 100
    },
    txtWelcome: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 20,
    //    fontFamily: 'sans-serif'
    },
    btn: {
        height: 40,
        width: 200,
        borderRadius: 3, 
        backgroundColor: '#ebc20e',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtBtn: {
        fontSize: 20,
        color: '#fff'
    },
    icons: {
        width: 70,
        height: 70
    },
    txtChange: {
        fontSize: 15,
        color: '#fff',
        textDecorationLine: 'underline',
        marginBottom: 6,   
    }
});