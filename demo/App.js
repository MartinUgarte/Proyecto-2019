import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

//Boludeces
import Home from './src/components/Home'
import Friends from './src/components/Friends'
import Animations from './src/components/Animations'
import Login from './src/components/Login/Login'

//Proyecto Posta
import Inicio from './src/screens/Inicio'
import Bienvenida from './src/screens/Bienvenida'
import SobreNosotros from './src/screens/SobreNosotros'



// ATENTI: Modificar en el initialRouteName la pantalla que se quiere testear
const RootStack = createStackNavigator(
  {
    Home: Home,
    Friends: Friends,
    Animations: Animations,
    Login: Login,
//-----------------------------------------------

    Inicio: Inicio,
    Bienvenida: Bienvenida,
    SobreNosotros: SobreNosotros
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}