import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'

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
                  
                    <View style={styles.header}>
                            <MenuButton navigation={this.props.navigation} />
                            <Text style={styles.titulo}>Sobre Nosotros</Text>
                    </View>
                    <MenuButton navigation={this.props.navigation} />

                    <ScrollView
                        scrollEventThrottle={16}                       
                    >
                        <View style={styles.imagesContainer}>
                            <Text>What can we help you find, Varun, I'm very funny xddd lol ajdiasjdi</Text>
                        </View>
                        
                    </ScrollView>

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
    header: {
        flex: 0.46,
        backgroundColor: 'rgba(209,75,166,0.83)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    titulo: {
        fontSize: 20,
        marginLeft: 67,
        marginTop: 10
        
    },
    imagesContainer: {
        flex: 1
    }

});