import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GetIP from './src/GetIP';
import Login from '../demo/src/components/Login/Login';


export default class App extends React.Component {
  render() {
    return (
      <Login />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
