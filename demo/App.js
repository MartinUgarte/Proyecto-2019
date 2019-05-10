import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';

import Login from './src/components/Login/Login';

export default class App extends React.Component {
  render() {
    return(
      <Login />
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

AppRegistry.registerComponent('AwesomeProject', () => App );
