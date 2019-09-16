import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default class ArrowLeft extends React.Component{
    render(){
        return(
            <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
        );
    }
}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        left: 20,
    }
})