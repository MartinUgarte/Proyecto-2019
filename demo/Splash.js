import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Splash extends Component{
    render(){
        return(
            <View style={styles.wrapper} >
                <View style={styles.titlewrapper}>
                    <Text style={styles.title}>Hello World</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Powered by Martin Ugarte</Text>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#27ae60',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'white',
        fontWeight: '200',
        paddingBottom: 20,
        alignItems: 'center',

    },
    titlewrapper: {
        justifyContent: 'center',
        flex: 1,
    }
});