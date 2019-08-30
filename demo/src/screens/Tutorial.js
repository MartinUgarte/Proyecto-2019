import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, StatusBar, Alert } from 'react-native'

import MenuButton from '../components/MenuButton';
import Carousel from 'react-native-snap-carousel';

export default class Tutorial extends Component{

    static navigationOptions = {
        header: null,   
    };

    constructor(props){
        super(props);
        this.state = {
            carouselItems: [
                {
                    title: "item 1"
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
            ],
            currentIndex: 0
        }
    }

    txtInteractivo = () => {
        if(this.state.currentIndex == 0){
            //Item 1;
            return <Text style={styles.interactivoStyle}>Bienvenido a Mycrotech</Text>
        }
        else if(this.state.currentIndex == 1){
            //Item 2;
            return <Text style={styles.interactivoStyle}>Conectarse a la red</Text>
        }
        else if(this.state.currentIndex == 2){
            //Item 2;
            return <Text style={styles.interactivoStyle}>Controlar el micro</Text>
        }
        else if(this.state.currentIndex == 3){
            //Item 2;
            return <Text style={styles.interactivoStyle}>Perfil</Text>
        }
        else if(this.state.currentIndex == 4){
            //Item 2;
            return( 
                <TouchableOpacity style={styles.siguienteBtn} onPress={() => this.props.navigation.navigate('Conexion')}>  
                    <Text style = {styles.interactivoStyle}>¡Conectarse!</Text>   
                </TouchableOpacity>
            )
        }
    }

    changeIndex = (currentIndex) => {
        this.setState({ currentIndex });
      }

    
    _renderItem({item,index}){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Image style={styles.ImageStyle} source={require('../images/jaja_xd.png')} />
                <Text style={{color:'#fff'}} >{item.title}</Text> 
                { this.cambiarInteractivo}                        
            </View>
        )
    }



    render(){
        return(

                <ImageBackground style={styles.container} source={require('../images/fondo.png')} imageStyle={{opacity: 1}}>

                        <StatusBar hidden />

                        <View style={styles.header}>
                                <MenuButton navigation={this.props.navigation} />
                                <Text style={styles.titulo}>Tutorial</Text>
                        </View>
                        <MenuButton navigation={this.props.navigation} />


                        <View style={styles.carouselContainer}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.carouselItems}
                                sliderWidth={260}
                                itemWidth={180}
                                renderItem={this._renderItem}
                                onSnapToItem={this.changeIndex}
                            />
                        </View>
    
                        <TouchableOpacity style={styles.footerView}>  
                            { this.txtInteractivo()}                         
                         </TouchableOpacity>

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
        backgroundColor: 'rgba(235,235,235,1)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    titulo: {
        fontSize: 20,
        marginLeft: 67,
        marginTop: 9
        
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
    footerView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        backgroundColor: 'rgba(0,0,0,0)',

    },
    interactivoStyle: {
        fontSize: 19,
        color: '#fff',
        opacity: 0.8
    },
    siguienteBtn: {
        height: 40,
        width: 230,
        overflow: 'hidden',
        borderColor: '#fff',
        borderRadius: 50,
        borderWidth: 1.8, 
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85 
    }

});