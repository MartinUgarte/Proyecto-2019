import React from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component {
    navLink(nav, text){
        return(
            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topLinks}>
                    <View style={styles.profile}>
                        <View style={styles.imgView}>
                            <Image style={styles.img} source={require('../images/Perfil.jpg')} />
                        </View>
                        <View style={styles.profileText}>
                            <Text style={styles.name}>Gustavo Yankelevich</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomLinks}>
                    {this.navLink('Home','Home')}
                    {this.navLink('Control','Control')}
                    {this.navLink('SobreNosotros','SobreNosotros')}
                </View>
                <View style={styles.footer}>
                    <Text style={styles.description}>Mycrotech</Text>
                    <Text style={styles.version}>v1.0</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777',
    },  
    profileText: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        paddingBottom: 5,
        color: 'white',
        textAlign: 'left'    
    },
    imgView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 30,
    },
    img: {
        height: 70,
        width: 70,
        borderRadius: 50  
    },
    topLinks: {
        height: 160,
        backgroundColor: 'black'
    },
    bottomLinks: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 50,
    },
    link: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'left',
    },
    txt: {
        color: 'white',
        paddingTop: 40
    },
    btn: {
        height: 50
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        color: 'gray'
    },
    description: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16
    } 
})