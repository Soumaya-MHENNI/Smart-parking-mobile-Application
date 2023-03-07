import React, {useState} from 'react'
import Logo from '../components/Logo'
import { theme } from '../core/theme'
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { Ionicons } from '@expo/vector-icons'
import { List, TextInput } from 'react-native-paper'
import { createDrawerNavigator} from 'react-navigation-drawer'
import { SideBar } from '../components/SideBar'
import axios  from 'axios';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'




export default function DriverPayment({...props}) {

    const paymentInfo = props.route.params.pay
    console.log(paymentInfo)

    const reservationDate = paymentInfo.date
    const reservationTime = paymentInfo.time
    const today = new Date().getTime()
    const thisDay = new Date()
    
    const reservation = new Date(reservationDate+ "T" + reservationTime+ ":00.284Z").getTime()

    const  durHours = Math.floor((today-reservation)/3600000)
    const durMins = Math.floor((((today-reservation)/3600000) % 1)*60)
    console.log(durMins)
    const cartInfo = {
        clientId: paymentInfo.id,
        lp: paymentInfo.licencePlate,
        duration: durHours + ":"+ durMins,
        amount: parseFloat(((today-reservation)/3600000).toPrecision(4)) 
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onPaySuccess = async () =>{
        await fetch('http://192.168.42.157:3001/MakePayment', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                cinPay: paymentInfo.id, 
                datePay: thisDay, 
                AmountPay: cartInfo.amount, 
                resId: paymentInfo.reserId
                
            })
            
            })
    }

    const onPayment = async () => {
    
        const paymeeToken = axios({
            method: 'post',
            baseURL: "https://sandbox.paymee.tn/api/v1/payments/create",
            headers: {
                "Authorization": "Token 790ad052bbaf3d06f9c8e17697f1fe404b5b3d10",
                "Content-Type": "application/json"
            },
            data: {
                
                "vendor": 1752,
                "amount": cartInfo.amount,
                "note": "Order #1000132"

            }
        })
        console.log((await paymeeToken).data.data.token)

        const url = "https://sandbox.paymee.tn/gateway/" + (await paymeeToken).data.data.token
        const geturl = "https://sandbox.paymee.tn/api/v1/payments/" + (await paymeeToken).data.data.token + "/check"
        
        try {
            
            await Linking.openURL(url)
            await sleep(1000)
            await axios({
            
                method: 'get',
                baseURL: geturl,
                headers: {
                    "Authorization": "Token 790ad052bbaf3d06f9c8e17697f1fe404b5b3d10",
                    "Content-Type": "application/json"
                }
            }).then((response) => { 
                console.log(response.data)
                if(response.data.data.payment_status === true){
                    Alert.alert("Success",
                    "Your payment has been carried successfully, press ok to continue.",
                    [{
                      text: 'OK', onPress: () => {
                          onPaySuccess();
                          props.navigation.navigate('FidelityPts')}
                      }
                    ])
                      
                } else {
                    Alert.alert("Oops!!",
                    "Something went wrong during the payment process.",
                    [{
                      text: 'OK', onPress: () => props.navigation.navigate('DriverPayment')
                      }
                    ])
                }
            })     
            
        } catch (error) {
            Alert.alert('Something went wrong during the payment process')
        }
        
    }


    return(
      <View style={styles.container}>
      {/*<View style={{ backgroundColor: theme.colors.primary, borderBottomStartRadius: 20, borderBottomEndRadius: 20, height: 80, width: 415, flexDirection: 'row'}}>
      <TouchableOpacity style={{alignItems: 'flex-start', marginTop: 35, marginStart: 30}} onPress={navigation.openDrawer} >
        <FontAwesome name="bars" size={24} color={theme.colors.surface}/>
        
      </TouchableOpacity>
      <Text style={{ fontSize: 15, marginStart: 125,marginTop: 15, alignSelf: 'center', fontWeight:'bold', color :theme.colors.surface }}>Payment</Text>

      <Image
                style={styles.image}
                source={require('../assets/LogoNoText.png')}
                />
    </View>*/}

    <TouchableOpacity style={{ borderRadius: 50, width: 50, height: 50, marginTop: 50, backgroundColor: theme.colors.primary, alignSelf: 'flex-start', marginStart: 35, alignItems: 'center', justifyContent:'center' }} onPress={props.navigation.goBack}>
    <Ionicons name="chevron-back" size={24} color={theme.colors.surface} />
    </TouchableOpacity>

      
        <Text style={{ fontSize: 25, marginTop: 200, color: theme.colors.secondary, fontWeight: 'bold'}}> Make Payment </Text>
        
        <View style={{ alignSelf:'center', flexDirection: 'row', marginTop: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Client: </Text>
        <Text style={{fontSize: 16}}>{cartInfo.clientId} </Text>
        </View>

        <View style={{ alignSelf:'center', flexDirection: 'row', marginTop: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Licence Plate: </Text>
        <Text style={{fontSize: 16}}>{cartInfo.lp} </Text>
        </View>
        
        <View style={{ alignSelf:'center', flexDirection: 'row', marginTop: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Parking Duration: </Text>
        <Text style={{fontSize: 16}}>{cartInfo.duration} </Text>
        </View>
        
        <View style={{ alignSelf:'center', flexDirection: 'row', marginTop: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Payable Amount: </Text>
        <Text style={{fontSize: 16}}>{cartInfo.amount} </Text>
        </View>

        <TouchableOpacity style={{ height: 60, width: 200, backgroundColor: theme.colors.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20}}
            onPress={() => {
                onPayment()
            }}
            >
            <Text style={{ color: theme.colors.surface, fontSize: 20, fontWeight: 'bold'}}>
                Proceed To Pay
            </Text>

        </TouchableOpacity>
        
        
        

    </View>
    )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: theme.colors.surface,
      alignItems: 'center'
      
  
    },
    image:{
      width: 30,
      height: 30,
      marginStart: 120,
      marginTop: 30
      
    }
  })