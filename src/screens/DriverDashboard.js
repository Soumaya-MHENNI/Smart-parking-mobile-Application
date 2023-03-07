import React, {useState} from 'react'
import Logo from '../components/Logo'
import { theme } from '../core/theme'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { FontAwesome} from '@expo/vector-icons'
import { List, TextInput, DarkTheme, Provider } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DriverHome from './DriverHome'
import DriverProfile from './DriverProfile'
import DrawerContent from './DrawerContent'
import DriverPaymentHistory from './DriverPaymentHistory'
import DriverSupport from './DriverSupport'
import LoginScreen from './LoginScreen'
import LoginScreenNoGoBack from './LoginScreenNoGoBack'
import DriverPayment from './DriverPayment';
import QrcodeM1 from './QrcodeM1';

import Fidelity from './FidelityScreen';
import DriverReservations from './DriverReservationHistory'
import About from './AboutScreen';
const Drawer = createDrawerNavigator()


export default function DriverDashboard({navigation}){

   
    return(
        
        <View style={styles.container}>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name="DriverHome" component={DriverHome}/>
            <Drawer.Screen name="DriverProfile" component={DriverProfile}/>
            <Drawer.Screen name="DriverPaymentHistory" component={DriverPaymentHistory}/>
            <Drawer.Screen name="DriverSupport" component={DriverSupport}/>
            <Drawer.Screen name="DriverReservations" component={DriverReservations}/>
            <Drawer.Screen name="About" component={About}/>
            </Drawer.Navigator>
        </View>
        
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface
        
      },
})