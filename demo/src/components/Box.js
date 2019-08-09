import React from 'react';
import { StyleSheet } from 'react-native';

export default class Box extends React.Component{
    render(){
        return(
            <Text style={styles.peticion}>No está conectado</Text>
        );
    }
}

const styles = StyleSheet.create({
    peticion:{
        color: '#fff',
        fontSize: 25
    },
})


