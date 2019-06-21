import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native'

export default class Bienvenida extends Component{

    static navigationOptions = {
        title: 'Sobre Nosotros.',
        headerStyle: {
            backgroundColor: '#F5E81D',
        },
    };

    render(){
        return(

                <ImageBackground style={styles.container} source={require('../images/Estudio.jpg')} imageStyle={{opacity: 0.6}}>
                  
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>¡Conoce un poco más sobre nosotros!</Text>
                    </View>
                    
                    <View style={styles.infoContainer}> 
                            <View style={styles.textContainer}>
                                <Image style={styles.imageStyle} source={require('../images/SobreNosotros_1.jpg')} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.infoText}>Con MX, a través de una aplicación móvil, se logra mover un brazo robótico.</Text>
                            </View>
                    </View>

                    <View style={styles.infoContainer}> 
                            <View style={styles.textContainer}>
                                <Text style={styles.infoText}>Se conseguiría la exactitud requerida y un ahorro de tiempo significativo.</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Image style={styles.imageStyle} source={require('../images/SobreNosotros_2.jpg')} />
                            </View>
                    </View>

                    <View style={styles.infoContainer}> 
                            <Image style={styles.imageStyle} source={require('../images/SobreNosotros_3.jpg')} />
                            <View style={styles.textContainer}>
                                <Text style={styles.infoText}>MX brinda presición, velocidad y comodidad.</Text>
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
    
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3
    },
    titleText: {
        color: '#fff',
        fontSize: 25,
       // fontFamily: 'sans-serif',
        textAlign: 'center'
        
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 1
    },
    imageStyle: {
        width: 130,
        height: 120,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    infoText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
    }
});