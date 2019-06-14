import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>We have no friends! </Text>
        <Button
          title="Ir a amigos"
          onPress={() =>
            this.props.navigation.navigate('Friends')
          }
        />
        <Button
          style={styles.estiloBoton}
          title="Ir a animaciones"
          onPress={() =>
            this.props.navigation.navigate('Carousel')
          }
        />
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
  estiloBoton: {
    marginTop: 40,
  }
});