import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native'
import LoginForm from './LoginForm';
import { StackNavigator } from 'react-navigator';

export default class Profile extends Component{
    static navigationOptions = {
        title: 'Login',
    };
    render(){
        const { navigate } = this.props.navigation;
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                    style={styles.logo}
                    source={require('../../images/Octocat.png')} 
                    />
                    <Text onPress= { () => navigate('Profile') } style={styles.title}>PERFIL</Text>
                </View>
                <View style={styles.formContainer}>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        color: '#fff',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.85,
    },
});