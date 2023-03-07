import React, {useEffect, useState} from 'react'
import Logo from '../components/Logo'
import { theme } from '../core/theme'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { List, TextInput } from 'react-native-paper';
import axios from 'axios';


export default function AddParking({ navigation }) {
    const [idParking, setIdParking] = useState({ value: '', error: '' })
    const [longitude, setLongitude] = useState({ value: '', error: '' })
    const [latitude, setLatitude] = useState({ value: '', error: '' })
    const [address, setAddress] = useState({ value: '', error: '' })
    
    

    const onSignUpPressed = () => {
      const idParkingError = nameValidator(idParking.value)
      const longitudeError = nameValidator(longitude.value)
      const latitudeError = nameValidator(latitude.value)
      const addressError = nameValidator(address.value)
      
      if (idParkingError || longitudeError || latitudeError || addressError ) {
          setIdParking({ ...idParking, error: idParkingError })
          setLongitude({...longitude, error: longitudeError})
          setLatitude({...latitude, error: latitudeError})
          setAddress({...address, error: addressError})
          
        return
      }
      
      fetch('http://192.168.42.157:3001/AddParking', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idParking: idParking.value,
          long: longitude.value,
          lat: latitude.value,
          addr: address.value,
          
        })
        });

      Alert.alert("Success", 
              "The parking has been added successfully, press ok to continue.", 
              [{text: 'OK', onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'AddParking' }],
                })
              }}])
      
    }


  return (
    <View style={styles.container} >
            
            <TouchableOpacity  style={styles.imageLayout} onPress={() => navigation.navigate('ManageParkings')}>
                <Image
                style={styles.image}
                source={require('../assets/BackArrow.png')}
                />
            </TouchableOpacity>
            
            <View style={{ alignSelf: 'center', marginTop: 60}}>
            <Logo/>
            </View>
            
            <ScrollView style={styles.scrollView}>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null}>
            
            <TextInput 
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            label="Parking ID"
            returnKeyType="next"
            mode='outlined'
            value={idParking.value}
            onChangeText={(text) => setIdParking({ value: text, error: '' })}
            error={!!idParking.error}
            errorText={idParking.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            label="Longitude"
            returnKeyType="next"
            mode="outlined"
            value={longitude.value}
            onChangeText={(text) => setLongitude({ value: text, error: '' })}
            error={!!longitude.error}
            errorText={longitude.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            mode='outlined'
            label="Latitude"
            returnKeyType="next"
            value={latitude.value}
            onChangeText={(text) => setLatitude({ value: text, error: '' })}
            error={!!latitude.error}
            errorText={latitude.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            mode='outlined'
            label="Address"
            returnKeyType="next"
            value={address.value}
            onChangeText={(text) => setAddress({ value: text, error: '' })}
            error={!!address.error}
            errorText={address.error}
            />
            
            
            
            <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24, width: 200, marginStart: 100 }}
        >
          Add Parking
        </Button>
        {/*<View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
  </View>*/}
        </KeyboardAvoidingView>
        </ScrollView>
        
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface
      
    },
    imageLayout: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 4,
        marginStart: 30
      },
      image: {
        width: 24,
        height: 24
      },
      row: {
        flexDirection: 'row',
        marginTop: 4,
        marginStart: 90
      },
      link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
      },
      scrollView: {
        backgroundColor: theme.colors.surface,
      },
  })