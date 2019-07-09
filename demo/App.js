import React from 'react';
import { Platform, Dimensions } from 'react-native';

import Inicio from './src/screens/Inicio'
import Bienvenida from './src/screens/Bienvenida'
import SobreNosotros from './src/screens/SobreNosotros'
import Control from './src/screens/Control'

import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import MenuDrawer from './src/components/MenuDrawer'

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH*0.80,
  contentComponent: ({ navigation}) => {
    return(<MenuDrawer navigation={navigation} />)
  }
}

const RootStack = createDrawerNavigator({
  Inicio: {screen: Inicio},
  Bienvenida: {screen: Bienvenida},
  SobreNosotros: {screen: SobreNosotros},
  Control: {screen: Control},

  },
  DrawerConfig
);

const App = createAppContainer(RootStack);

export default App;
