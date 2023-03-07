import React, {useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert, Modal, Pressable} from 'react-native'
import { createDrawerNavigator} from 'react-navigation-drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { createAppContainer } from 'react-navigation'
import DriverProfile  from './DriverProfile'
import { SideBar } from '../components/SideBar'
import { colors } from 'react-native-elements'
import { theme } from '../core/theme'
import { FontAwesome, Feather} from '@expo/vector-icons'
import  MapView, { Marker, Callout }  from 'react-native-maps'
import { Button } from 'native-base'
import MarkerPopUp from '../components/MarkerPopUp'
import { ChatItem } from 'react-chat-elements/native'
import Icon from "react-native-vector-icons/AntDesign";
import { Avatar, Badge, withBadge } from "react-native-elements";
const MessageIcon = <Icon name="ellipsis1" size={35} color="#3891c0" />;

export default function DriverHome({navigation}){
 
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  const [ Lu, setLu ] = useState(0)
  const [ parkingInfo, setParkingInfo ] = useState('')
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/DriverHomeParkingInfo');
      const result = await response.json();
      //console.log(result)
      setParkingInfo(result)
    }
    fetchData();
  },[]);
  var data = []
  for(let i=0; i< parkingInfo.length; i++ ){
    data.push(Object.values(parkingInfo[i]))
  }
  //console.log(data)
  const positions = {}
  const position = {}
  
  var lat = 0.0
  var long = 0.0
  var address = ''
  var freeSpaces = 0
  for( let i=0; i<data.length; i++){
    //position["latitude"] = data[i][1]
    //position["longitude"] = data[i][2]
    //positions["marker".concat(i.toString())] = position
    
    lat = data[i][1]
    long = data[i][2]
    address = data[i][4]
    freeSpaces = data[i][3]
  }
  console.log(lat)
  console.log(long)
  console.log(address)
  console.log(freeSpaces)
  const state = {

    longitude:	10,
    latitude:		36,
    latitudeDelta: 33.886917,
    longitudeDelta: 9.537499,
    
  }
  
  const showLongNotification = () => {
    
  };

  const [alertVisible1, setAlertVisible1] = useState(false)

  const handleOpen1 = () => {
    setAlertVisible1(true)
  }
  const handleClose1= () => {
    setAlertVisible1(false)
  }

  const [alertVisible2, setAlertVisible2] = useState(false)

  const handleOpen2 = () => {
    setAlertVisible2(true)
  }
  const handleClose2= () => {
    setAlertVisible2(false)
  }

  const [alertVisible3, setAlertVisible3] = useState(false)

  const handleOpen3 = () => {
    setAlertVisible3(true)
  }
  const handleClose3= () => {
    setAlertVisible3(false)
  }

  const [modalVisible, setModalVisible] = useState(false)

  const [ adminReply, setAdminReply ] =useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AdminReplyNotif');
      const result = await response.json();
      //console.log(result)
      setAdminReply(result)
    }
    fetchData();
  },[]);
  
  var subject = ''
  var reply = ''
  var isread = 0
  for(let i=0; i< adminReply.length; i++ ){
      subject = adminReply[i]["SubjectRev"]
      reply = adminReply[i]["ReplyRev"]
      isread = adminReply[i]["Lu"]
  }
  console.log(subject, reply, isread)

  return(
    
    <View style={styles.container}>
      <Text style={{color: 'transparent'}}>{long} {lat}</Text>
      <MapView style={{ flex: 1}} initialRegion={{ latitudeDelta: state.latitudeDelta, longitudeDelta: state.longitudeDelta, latitude: state.latitude, longitude: state.longitude }} >
      <Marker coordinate={ { longitude: lat, latitude: long}} image={require('../assets/marker.png')} style={{ width: 10, height: 10}} onPress={() => {handleOpen1()}}/>
      {/*<Marker coordinate={ {longitude: markers.marker2.longitude, latitude: markers.marker2.latitude}} image={require('../assets/marker.png')} style={{ width: 10, height: 10}} onPress={() => {handleOpen2()}}/>
      <Marker coordinate={ {longitude: markers.marker3.longitude, latitude: markers.marker3.latitude}} image={require('../assets/marker.png')} style={{ width: 10, height: 10}} onPress={() => {handleOpen3()}}/>*/}

      
      </MapView>
      
        
      <View style={{ backgroundColor: theme.colors.surface, borderBottomStartRadius: 20, borderBottomEndRadius: 20, height: 80, width: 410, flexDirection: 'row', position: "absolute"}}>
      <TouchableOpacity style={{alignItems: 'flex-start', marginTop: 35, marginStart: 30}} onPress={navigation.openDrawer} >
        <FontAwesome name="bars" size={24} color={theme.colors.primary}/>
        
      </TouchableOpacity>
      <Text style={{ fontSize: 15, marginStart: 133, marginTop: 15, alignSelf: 'center', fontWeight:'bold', color :theme.colors.primary }}>Home</Text>

      <Image
                style={styles.image}
                source={require('../assets/LogoNoText.png')}
                />
      </View>

      <MarkerPopUp address={address} freeSpaces={freeSpaces} visible={alertVisible1} close={() => {handleClose1()}} navigation={()=>{navigation.navigate('DriverReservationM1', { itemId: 2, latitude: lat, longitude: long })
                                                                                                                            handleClose1()}} />
      {/*<MarkerPopUp address="Tunis" freeSpaces={5} visible={ alertVisible2} close={() => {handleClose2()}} navigation={()=>{navigation.navigate('DriverReservationM2')
                                                                                                                            handleClose2()}}/>
      <MarkerPopUp address="Djerba, Midoune" freeSpaces={8} visible={ alertVisible3} close={() => {handleClose3()}} navigation={()=>{navigation.navigate('DriverReservationM3')
    handleClose3()}}/>*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={[
            styles.centeredView,
            { width: "92.5%" },
            { height: "70%" },
            { alignSelf: "center" },
          ]}
        >
          <View
            style={[
              styles.modalView,
              { width: "92.5%" },
              { height: "50%" },
              { alignSelf: "center" },
            ]}
          >
            <View
              style={
                styles.Tabcontainer
                }
            >
               <ChatItem
                
                avatar={require('../assets/LogoNoText.png')}
                alt={"Reactjs"}
                subtitle={subject}
                title={new Date().toString().substr(0,15)}
                date={null}
                unread={0}
              />
              <Text style={{marginStart:80, marginTop:10 }}>{reply}</Text>
             
              
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setLu(1)
                setModalVisible(!modalVisible)}}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
<TouchableOpacity
          style={{
            borderRadius: 70,
            width: 70,
            height: 70,
            marginTop: 740,
            backgroundColor: theme.colors.surface,
            
            marginStart: 310,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#a9a9a9a",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 80,
            shadowOffset: { width: 1, height: 80 },
            position: 'absolute'
          }}
          onPress={() => setModalVisible(true)}
        >
        {Lu===0 ? (
          <Badge
        
          value={"+"+isread}
          status="error"
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
        ):(
          <Badge badgeStyle={{ backgroundColor: 'transparent'}} containerStyle={{ position: "absolute", top: -4, right: -4 }} />
        )}
        
          {MessageIcon}
          {/*<Feather name="bell" size={24} color={theme.colors.primary} />*/}
        </TouchableOpacity>  
  </View>
  
  )
}
const styles = StyleSheet.create({
  container:{
    
    flex: 1,
    backgroundColor: theme.colors.surface,
    

  },
  image:{
    width: 30,
    height: 30,
    marginStart: 130,
    marginTop: 30
    
  },
  panel: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    paddingTop: 0,
    height: 300,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: theme.colors.primary,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: "100%",
  },
  buttonOpen: {
    backgroundColor: theme.colors.primary,
    width: "100%",
  },
  buttonClose: {
    backgroundColor: theme.colors.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  Tabcontainer: {
    flex: 1,
    width: 350,
  
    paddingEnd: 40,
    backgroundColor: "#fff",
  },
})