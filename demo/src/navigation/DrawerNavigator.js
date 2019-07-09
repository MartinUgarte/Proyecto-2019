import React from 'react';
import { Platform, Dimensions } from 'react-native';

import Inicio from '../screens/Inicio'
import Bienvenida from '../screens/Bienvenida'
import SobreNosotros from '../screens/SobreNosotros'
import Control from '../screens/Control'

import { createAppContainer, createDrawerNavigator } from 'react-navigation';


  //Configuración de screens
const RootStack = createDrawerNavigator({
  Inicio: {screen: Inicio},
  Bienvenida : {screen: Bienvenida },
  SobreNosotros : {screen: SobreNosotros },
  Control: {screen: Control}
  
})

const App = createAppContainer(RootStack);

export default App;
