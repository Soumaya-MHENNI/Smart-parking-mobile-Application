
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text,Alert,TouchableWithoutFeedback,TouchableNativeFeedback, View ,Image, SafeAreaView,Platform} from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import  { useState, useEffect } from 'react';
import { NavigationEvents } from 'react-navigation';
import {TouchableOpacity} from 'react-native'; 
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 
import { theme } from '../core/theme';
var { Dimensions } = require('react-native')

export default function Appl ({...props}) {
  
  const [ state, setState] = useState({ longitude: 0, latitude: 0, error: null})     
  const [ longLat, setLongLat ] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://192.168.42.157:3001/ReservationLongLat', {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          idReser: props.route.params.resId
        })
        
      })
      const result = await response.json();
      //console.log(result)
      setLongLat(result)
    }
    fetchData();
  },[]);

  
  
  
  const navigationOptions = {
          title : 'Map',
    };
  const  marker1 = {
      longitude: 0,
      latitude:0 
  }
  
  for(let i=0; i<longLat.length;i++){
    marker1.longitude = longLat[i].Longitude
    marker1.latitude = longLat[i].Latitude
  }
  console.log(marker1)
  const date = props.route.params.date
  const time = props.route.params.time
  const mat = props.route.params.mat
  const cin = props.route.params.cin
  const resId = props.route.params.resId
  console.log(resId)
 
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(position =>{
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          error:null
        });

      },
      error => setState({error: error.message}),
      {enableHighAccuracy:true, timeout:2000, maximumAge:2000}
      )
    },[]);
    
    return(
            <View style={styles.container}>
              
               
               <MapView
                style={styles.map}
                region={{
                    latitude: state.latitude,
                    longitude : state.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001

                }}
              > 
            <Marker coordinate={state}/>
            <Marker coordinate= {marker1} image={require('../assets/marker.png')}/>
            <MapViewDirections
            origin={state}
          destination={marker1}
            apikey="AIzaSyCPNM9bHIirW_SbaLZpSbSeuWzipJwgHlo"
            strokeWidth={3}
              strokeColor={theme.colors.error}
           />
            </MapView>
            <TouchableOpacity style={{ borderRadius: 50, width: 50, height: 50, marginTop: 50, backgroundColor: theme.colors.surface, alignSelf: 'flex-start', marginStart: 35, alignItems: 'center', justifyContent:'center' }} onPress={() => props.navigation.navigate('DriverHome')}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 70, width: 70, height: 70, marginTop: 650 , backgroundColor: theme.colors.surface, alignSelf: 'flex-end', marginEnd: 30, alignItems: 'center', justifyContent:'center' }} onPress={()=> props.navigation.navigate('QrcodeM1',{ itemId: 4, date: date, time: time, mat: mat, cin: cin, reserId: resId})}>
          <FontAwesome name="qrcode" size={35} color={theme.colors.primary} />
          </TouchableOpacity>
            
           
            </View>
        );
    
}

 const styles = StyleSheet.create({
   container: 
   {...StyleSheet.absoluteFillObject},
   map : 
   {...StyleSheet.absoluteFillObject

   },
   button : {
       backgroundColor: theme.colors.primary
   }
   
 });