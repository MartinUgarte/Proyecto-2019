import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';

import {NetworkInfo} from 'react-native-network-info';

export default class GetIP extends Component {

    componentDidMount() {
        console.log(NetworkInfo);

        async function getIP() {
            return await NetworkInfo.getIPAddress();
        }
        getIP().then( (IP) => {
            console.log(IP);
        } );
        
    }

    

    render() {
        return(
          <View style={styles.container}>
            <Text></Text>
          </View>
        );
    }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });