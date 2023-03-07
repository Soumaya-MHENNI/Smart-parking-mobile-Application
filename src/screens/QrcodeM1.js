import React, {Component} from 'react';
import { render } from 'react-dom';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import {StyleSheet, View, Button,TextInput,Text,Image,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import { WebView } from 'react-native-webview';
import { Buffer } from 'buffer';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { theme } from '../core/theme';


export default class QRcodeM1 extends React.Component{
    constructor(props){
      super(props);
      
    };
    
    state = {
      id: this.props.route.params.cin,
      licencePlate: this.props.route.params.mat,
      date: this.props.route.params.date,
      time: this.props.route.params.time,
      reserId : this.props.route.params.reserId
      
      
    };

    renderInner = () => (
      <View style={styles.panel}>
        
    <Text style={styles.panelTitle}> QRCode</Text>
    <Text style={styles.panelSubtitle}>
      The QRcode is confidential
    </Text>
    
    <View style={styles.panelButton}>
      <QRCode style={{alignItems: 'center'}}

      value={JSON.stringify(this.state)}
      size={300}
      bgColor='black'
      fgColor='white'/>
    </View>
    
    </View>
  )
        
          
            
         
         
      
    
      renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      )
    
      bs = React.createRef()
      //fall= new Animated.value(1)
      
   render(){
    const {navigate} = this.props.navigation;
    const {goBack} = this.props.navigation;
       return (
        
        <View style={styles.container}>
          <View style={{flexDirection: 'row', width: 400, alignSelf: 'center'}}>
          <TouchableOpacity style={{ borderRadius: 50, width: 50, height: 50, marginTop: 150, backgroundColor: theme.colors.primary, alignSelf: 'flex-start', marginStart: 30, alignItems: 'center', justifyContent:'center' }} onPress={() =>{navigate('QrMapScreenM1')}}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.surface} />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 50, width: 50, height: 50, marginTop: 150, backgroundColor: theme.colors.primary, marginStart: 240, alignItems: 'center', justifyContent:'center' }} onPress={() =>{navigate('DriverPayment',{ itemId: 5, pay: this.state})}} >
          <MaterialIcons name="payment" size={24} color={theme.colors.surface} />
          </TouchableOpacity>
          </View>
        <BottomSheet
          ref={this.bs}
          snapPoints={[750, 180]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
        />
        <TouchableWithoutFeedback onPress={() => this.bs.current.snapTo(0)}>
        <Image style={styles.map} />
        </TouchableWithoutFeedback>
      </View>
  
       );
   }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      panel: {
        height: 100,
        padding: 20,
        backgroundColor: theme.colors.primary,
      },
      header: {
        backgroundColor: theme.colors.primary,
        shadowColor: '#000000',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
        color: theme.colors.surface
      },
      panelSubtitle: {
        fontSize: 14,
        color: theme.colors.surface,
        height: 30,
        marginTop: 5,
        marginStart: 10,
        marginBottom: 10,
      },
      panelButton: {
        padding: 100,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 50,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
      },
      map: {
        height: '100%',
        width: '100%',
      },

 
    
});