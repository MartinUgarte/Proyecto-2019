import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';


export default class Carousel extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
            carouselItems: [
            {
                title:"Item 1"
            },
            {
                title:"Item 2"
            },
            {
                title:"Item 3"
            },
            {
                title:"Item 4"
            },
            {
                title:"Item 5"
            }
        ]}
    }
  
    _renderItem({item,index}){
        return (
            <View>
                <Image source={require('./assets/cuadro.jpg')}/>
                <Text>{item.title}</Text>
            </View>
                
            
        )
    }

    render() {
    return (
      <View style={styles.container}>
        <Text>Mirate este carousel </Text>
        
        <Carousel
            ref = { ref => this.carousel = ref }
            data={this.state.carouselItems}
            sliderWidth={250}
            itemWidth={250}
            renderItem={this._renderItem}
        />

    
        <Button
          style={styles.estiloBoton}
          title="Ir a Home"
          onPress={() =>
            this.props.navigation.navigate('Home')
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