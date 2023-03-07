import React from 'react'
import { State } from 'react-native-gesture-handler'
import Background from '../components/Background'
import Logo from '../components/Logo'
import { Image, StyleSheet, View , Text} from 'react-native'
import { theme } from '../core/theme'

export default function SplashScreen({navigation}){
    
    setTimeout(()=> {navigation.navigate('StartScreen')}, 3000) 
    return(
        <View style={styles.container} behavior="padding">
            <View>
            <Image source={require("../assets/Logo.png")} style={styles.image} />
            </View>
            <View>
            <Text style={styles.text}>Powered By</Text>
            <Image source={require("../assets/LogoTalan.png")} style={styles.talan} />
            </View>
        </View>
    )
}   


const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      marginTop: 300,
      alignSelf: 'center'
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: theme.colors.surface,
        
        
    },
    text: {
        fontWeight: 'bold',
        fontSize: 10,
        lineHeight: 26,
        textAlign: 'center',
        marginTop: 200
        

    },
    talan: {
        
        width: 50,
        height: 30,
        alignSelf: 'center',
        

      },
  })