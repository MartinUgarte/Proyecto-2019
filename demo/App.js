import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

//Boludeces
import Home from './src/components/Home'
import Friends from './src/components/Friends'
import Animations from './src/components/Animations'
import IPyMask from './src/components/IPyMask/IPyMask'

//Proyecto Posta
import Inicio from './src/screens/Inicio'
import Bienvenida from './src/screens/Bienvenida'
import SobreNosotros from './src/screens/SobreNosotros'
import Control from './src/screens/Control'
import IPyMask from './src/components/IPyMask/IPyMask'




<<<<<<< HEAD
const RootStack = createDrawerNavigator({
  Inicio: {screen: Inicio},
  Bienvenida: {screen: Bienvenida},
  SobreNosotros: {screen: SobreNosotros},
  Control: {screen: Control},
  IPyMask: {screen: IPyMask}
=======
// ATENTI: Modificar en el initialRouteName la pantalla que se quiere testear
const RootStack = createStackNavigator(
  {
    Home: Home,
    Friends: Friends,
    Animations: Animations,
    IPyMask: IPyMask,
//-----------------------------------------------
>>>>>>> parent of d8d5504... Menu Lateral Listo

    Inicio: Inicio,
    Bienvenida: Bienvenida,
    SobreNosotros: SobreNosotros,
    Control: Control
  },
  {
<<<<<<< HEAD
    initialRouteName: 'IPyMask',
  },
  DrawerConfig
=======
    initialRouteName: 'Control',
  }
>>>>>>> parent of d8d5504... Menu Lateral Listo
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}