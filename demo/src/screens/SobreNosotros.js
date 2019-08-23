import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'

import MenuButton from '../components/MenuButton';
import Carousel from 'react-native-snap-carousel';



export default class Bienvenida extends Component{

    static navigationOptions = {
        header: null,   
    };

    constructor(props){
        super(props);
        this.state = {
            carouselItems: [
                {
                    title: "Item 1"
                },
                {
                    title: "item 2"
                },
                {
                    title: "Item 3"
                },
                {
                    title: "Item 4"
                },
                {
                    title: "Item 5"
                }
            ]
        }
    }

    _renderItem({item,index}){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Image style={styles.ImageStyle} source={require('../images/jaja_xd.png')} />
                <Text style={{color:'#fff'}} >{item.title}</Text>
            </View>
        )
    }

    render(){
        return(

                <ImageBackground style={styles.container} source={require('../images/Estudio.jpg')} imageStyle={{opacity: 0.6}}>
                        <View style={styles.header}>
                                <MenuButton navigation={this.props.navigation} />
                                <Text style={styles.titulo}>Sobre Nosotros</Text>
                        </View>
                        <MenuButton navigation={this.props.navigation} />

                        <View style={styles.carouselContainer}>
                            <Carousel
                                ref = { ref => this.carousel = ref}
                                data={this.state.carouselItems}
                                sliderWidth={260}
                                itemWidth={180}
                                renderItem={this._renderItem}
                            />
                        </View>
                </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000'

    },
    header: {
        flex: 0.1,
        backgroundColor: 'rgba(209,75,166,0.83)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    titulo: {
        fontSize: 20,
        marginLeft: 67,
        marginTop: 10
        
    },
    carouselContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 100,
        height: 100
    },  


});