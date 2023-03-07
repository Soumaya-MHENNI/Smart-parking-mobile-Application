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


export default function About ({navigation}) {
  
    
      
      return(
        <View style={styles.container}>
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            height: 80,
            width: 410,
            flexDirection: "row",
            position: "absolute",
            shadowColor: "a9a9a9",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "flex-start", marginTop: 35, marginStart: 30 }}
            onPress={navigation.openDrawer}
          >
            <FontAwesome name="bars" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
  
          <Text
            style={{
              fontSize: 15,
              marginStart: 133,
              marginTop: 15,
              alignSelf: "center",
              fontWeight: "bold",
              color: theme.colors.primary,
            }}
          >
            About
          </Text>
  
          <Image
            style={styles.image}
            source={require("../assets/LogoNoText.png")}
          />
        </View>
        </View>
          );
      
  }
  
   const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
      },
      image: {
        width: 30,
        height: 30,
        marginStart: 130,
        marginTop: 30,
      }
   });