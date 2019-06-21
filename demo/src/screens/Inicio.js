import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button } from 'react-native'

export default class Inicio extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };

    render(){
        return(

                <ImageBackground style={styles.container} source={require('../images/Estudio.jpg')} imageStyle={{opacity: 0.6}}>
                  
                    <View style={styles.titleView}>
                        <Text style={styles.title}>MYCRO XP.</Text>
                        <Image style={styles.logo} source={require('../images/Micro2.png')} />

                    </View>

                    <View style={styles.textView}>          
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Bienvenida')}>  
                            <Text style = {styles.txtBtn}>Iniciar Sesión </Text>   
                        </TouchableOpacity>
                    </View>


                    <View style={styles.buttonView}>  
                            
                            <View style={styles.icons}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SobreNosotros')}>
                                    <Image style={styles.iconImage} source={require('../images/SobreNosotros.png')} />
                                </TouchableOpacity>
                                <Text style={styles.txtIcon}>Sobre Nosotros .</Text>
                            </View>
                            <View style={styles.icons}>
                                <Image style={styles.iconImage} source={require('../images/Registrarse.png')} />
                                <Text style={styles.txtIcon}>¡Registrarse! .</Text>
                            </View>
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        color: '#fff',
    //    fontFamily: 'sans-serif'
    },
    logo: {
        marginTop: 20,
        width: 100,
        height: 100
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 70,
        height: 70
    },
    txtIcon: {
        fontSize: 15,
        marginTop: 7,
        color: '#fff'
    }
});