import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, StatusBar, TextInput } from 'react-native'

export default class Login extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,   
    };

    render(){
        return(

                
                <ImageBackground style={styles.container} source={require('../images/fondo.png')} imageStyle={{opacity: 1}}>
                  

                    <View style={styles.titleView}>
                        <Image style={styles.logo} source={require('../images/Micro2.png')} />
                        <Text style={styles.title}>Iniciar sesión</Text>
                    </View>

                    <View style={styles.formView}>  
                            <Text style={styles.txtForm}>Dirección de correo electrónico</Text>     
                            <TextInput
                                    placeholder="mycrotech@gmail.com" 
                                    placeholderTextColor="black"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.formStyle}
                            />

                    </View>


                    <View style={styles.buttonView}>  
                        <TouchableOpacity style={styles.changeView} onPress={() => this.props.navigation.navigate('Bienvenida')}>  
                            <Text style = {styles.txtChange}>Cambiar de usuario</Text>   
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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
 
    formView: {
        flex: 1,
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
   //     fontFamily: 'sans-serif'
    },
    logo: {
        marginTop: 20,
        width: 130,
        height: 130
    },
    txtForm: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    //    fontFamily: 'sans-serif'
    },
    formStyle: {
        backgroundColor: '#fff',
        width: 250
    }
   
});