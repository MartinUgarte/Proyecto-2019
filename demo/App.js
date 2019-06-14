import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

import Home from './src/components/Home'
import Friends from './src/components/Friends'
import Animations from './src/components/Animations'
import Carousel from './src/components/Carousel'




const RootStack = createStackNavigator(
  {
    Home: Home,
    Friends: Friends,
    Animations: Animations,
    Carousel: Carousel,

  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}