import { Table, Row, Rows } from "react-native-table-component";
import React, { useEffect, useState} from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from "react-native-paper";
import { theme } from "../core/theme";



export default function ManageParkings({ navigation }) {
  const editIcon = <Icon1 name="playlist-plus" size={28} color="#3891c0" onPress={()=> navigation.navigate('AddParking')}/>;
  const BackIcon = <Icon2 name="chevron-back" size={40} color="#3891c0" />;
  const removeIcon = <MaterialCommunityIcons name="playlist-remove" size={28} color="#3891c0" onPress={() => setModalVisible(true)} />
  const RemoveParking = (
    <Icon1 name="playlist-remove" size={40} color="#3891c0" />
  );
  const [ modalVisible1, setModalVisible] = useState(false)
  const [ parkingTable, setParkingTable ] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AdminParkingsTable');
      const result = await response.json();
      //console.log(result)
      setParkingTable(result)
    }
    fetchData();
  },[]);
  
  var parkingtab = []
  for(let i=0; i<parkingTable.length;i++){
    parkingtab.push(Object.values(parkingTable[i]))
  }
  
  //console.log(parkingtab)
  
  var data = []
  for(let i=0; i <parkingtab.length;i++){
    data.push([parkingtab[i][0], parkingtab[i][1].concat(" ").concat(parkingtab[i][2]), parkingtab[i][3].toString().concat("/6")])

  }

  console.log(data)
  const state = {
    tableHead: ["Address", "Agent", "Status"],

    tableData: data,

  };

  const [ search, setSearch ] = useState('')
  const searchFilter = (text) => {
    if(text){
      const newdata = data.filter((item) => item[0].toString() === text)
      setSearch(newdata)
      
    }
    
  }

  var addr = null
  for( let i=0; i<search.length; i++){
    addr = search[i][0]
    
  }
  const onParkingRemove = async () => {

    fetch('http://192.168.42.157:3001/ParkingDelete', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        addr: addr
      })
      
    })
  }

  

  return (
    <View>
      <ScrollView>
        <Table
          borderStyle={{
            borderWidth: 2,
            borderColor: theme.colors.primary,
          }}
        >
          <Row
            data={state.tableHead}
            style={styles.Tabhead}
            textStyle={styles.TabHeadertext}
          />
          <Rows data={state.tableData} textStyle={styles.Tabtext} />
        </Table>
        
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible1);
              }}
            >
              <View
                style={[
                  styles.centeredView,
                  { width: "92.5%" },
                  { height: "70%" },
                  { alignSelf: "center" },
                  { minHeight: Math.round(Dimensions.get("window").height) },
                ]}
              >
                <View
                  style={[
                    styles.modalView,
                    { width: "92.5%" },
                    { height: "61%" },
                    { alignSelf: "center" },
                  ]}
                >
                  <View
                    style={[
                      styles.Tabcontainer,
                      { width: "92.5%" },
                      { height: "70%" },
                      { alignSelf: "center" },
                      { alignItems: "center" },
                    ]}
                  >
                    <Searchbar
                      placeholder="Address"
                      onChangeText={(text) => searchFilter(text)}
                      
                      onIconPress={() => navigation.navigate("AdminDashboard")}
                      
                    />
                  </View>
                  
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonClose,
                      { marginBottom: 20 },
                    ]}
                    onPress={() => onParkingRemove()}
                  >
                    <Text style={styles.textStyle}>Remove Parking</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible1)}
                    
                  >
                    <Text style={styles.textStyle}>Hide</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
        <View
          style={{
            flexDirection: "row",
            paddingStart: 250,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              paddingTop: 30,

              color: theme.colors.primary,
              marginBottom: 30,
              marginLeft: 30,
            }}
          >
            {editIcon}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingTop: 30,

              color: theme.colors.primary,
              marginBottom: 30,
              marginLeft: 30,
            }}
          >
            {removeIcon}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
          style={{ alignItems: "flex-start", marginTop: 30, marginStart: 25 }}
          onPress={() => navigation.navigate("AdminDashboard")}
        >
          {BackIcon}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            marginStart: 65,
            marginTop: 15,
            alignSelf: "center",
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          Parking Management
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
    marginStart: 60,
    marginTop: 35,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  Tabcontainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  Tabhead: {
    height: 40,
    backgroundColor: theme.colors.primary,
    marginTop: 120,
  },
  TabHeadertext: {
    fontWeight: "bold",
    margin: 6,
    color: "white",
    textAlign: "center",
  },
  Tabtext: {
    margin: 6,
    color: theme.colors.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
});
