import React from 'react';
import { Platform, Dimensions } from 'react-native';

import Inicio from './src/screens/Inicio'
import Bienvenida from './src/screens/Bienvenida'
import SobreNosotros from './src/screens/SobreNosotros'
import Control from './src/screens/Control'
import Conexion from './src/screens/Conexion'
import Tutorial from './src/screens/Tutorial'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Menu from './src/screens/Menu'
import Bandas from './src/screens/Bandas'
import NuevaBanda from './src/screens/NuevaBanda'
import Canciones from './src/screens/Canciones'


import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import MenuDrawer from './src/components/MenuDrawer'

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH*0.68,
  contentComponent: ({ navigation}) => {
    return(<MenuDrawer navigation={navigation} />)
  },
  drawerPosition: 'right'
}

const RootStack = createDrawerNavigator({
 
  Inicio: {screen: Inicio},
  SobreNosotros: {screen: SobreNosotros},
  Tutorial: {screen: Tutorial},
  Bienvenida: {screen: Bienvenida},
  Conexion: {screen: Conexion},
  Control: {screen: Control},
  Login: {screen: Login},
  Register: {screen: Register},
  Menu: {screen: Menu},
  Bandas: {screen: Bandas},
  NuevaBanda: {screen: NuevaBanda},
  Canciones: {screen: Canciones}

},
  DrawerConfig
);

const App = createAppContainer(RootStack);

export default App;