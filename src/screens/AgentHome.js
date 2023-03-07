import React, { useEffect, useState, useRef } from "react";
import { BarChart, LineChart } from "react-native-chart-kit";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
} from "react-native";

import { theme } from "../core/theme";
import { Card, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";


const parkingIcon = <Icon name="parking" size={28} color="#3891c0" />;
const balance = <Icon2 name="finance" size={28} color="#3891c0" />;
const alert = <Icon2 name="boom-gate-alert" size={28} color="#3891c0" />;
const occupied = <Badge status="error" />;
const free = <Badge status="success" />;

export default  function AgentHome({ navigation }) {
  
  const [rep , setRep] = useState('')
  const [ freeTable, setFreeTable ] = useState('')
  const [ balanceGraph, setBalanceGraph ] = useState('')
  const [ todayBalance, setTodayBalance ] = useState(0.0)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AgentfreeSpacesButton');
      const result = await response.json();
      //console.log(result)
      setRep(JSON.stringify(result))
    }
    fetchData();
  },[]);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AgentfreeSpacesTable');
      const result = await response.json();
      //console.log(result)
      setFreeTable(JSON.stringify(result))
    }
    fetchData();
  },[]);

  
  const table1 = freeTable.split(":")
  
  var data = []
  for(let i=1; i< table1.length; i++ ){
    data.push(table1[i].substr(0,1))
  }
  
  var data1 = []
  for(let i=0; i< data.length; i=i+2){
    if(data[i+1] === "1"){
      data1.push([ data[i], occupied])
    }
    if(data[i+1] === "0"){
      data1.push([ data[i], free])
    }
  }
  
  const state = {
    tableHead: ["Place", "Status"],
    tableData: data1,
  };

    
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AgentBalanceGraph');
      const result = await response.json();
      //console.log(result)
      setBalanceGraph(JSON.stringify(result))
    }
    fetchData();
  },[]);
  const balance1 = balanceGraph.split(/:/)
  //console.log(balance1)
  var balance2 = []
  for(let i=1; i<balance1.length; i++){
    balance2.push(balance1[i].split(/"/))
  }
  //console.log(balance2)

  var days = []
  for(let i=0; i<balance2.length;i=i+2) {
    days.push(balance2[i][1])
  }
  //console.log(days)
  
  var profit = []
  for(let i=1;i<balance2.length;i=i+2){
    profit.push(balance2[i][0].match(/\d{1,2}[\,\.]{1}\d{1,2}/))
  }
  //console.log(profit)

  var profit1 = []
  for(let i=0; i<profit.length; i++){
    profit1.push(parseFloat(profit[i][0]))
  }

  //console.log(profit1)
  const weeklybalance = {
    labels: days,
    datasets: [
      {
        data: profit1,
      },
    ],
  };



  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AgentTodayBalanceButton');
      const result = await response.json();
      //console.log(result)
      setTodayBalance(JSON.stringify(result))
    }
    fetchData();
  },[]);
  
  var today = ''
  if( todayBalance === "null" || todayBalance === "NaN"){
    today = '0'
  } else {
    today = todayBalance
  }


  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 2,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 2) => `rgba(56, 145, 192, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: true, // optional
  };
  return (
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
          Home
        </Text>

        <Image
          style={styles.image}
          source={require("../assets/LogoNoText.png")}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          marginTop: 160,
        }}
      >
        <View style={{ width: "100%" }}>
          <Card containerStyle={{ borderRadius: 15 }}>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <View style={{ width: "100%" }}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
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
                        { height: "70%" },
                        { alignSelf: "center" },
                      ]}
                    >
                      <View
                        style={[
                          styles.Tabcontainer,
                          { width: "92.5%" },
                          { height: "70%" },
                          { alignSelf: "center" },
                        ]}
                      >
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
                          <Rows
                            data={state.tableData}
                            textStyle={styles.Tabtext}
                          />
                        </Table>
                      </View>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Hide</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {rep}
                  </Text>
                </Pressable>
              </View>
            </View>

            <Card.Title style={{ fontSize: 24, marginTop: 20 }}>
              {parkingIcon} Free Spaces
            </Card.Title>
          </Card>
          <Card containerStyle={{ borderRadius: 15 }}>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 24,
                  color: "white",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                10
              </Text>
            </View>

            <Card.Title style={{ fontSize: 24, marginTop: 20 }}>
              {alert} Alerts
            </Card.Title>
          </Card>
          <Card containerStyle={{ borderRadius: 15 }}>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <View style={{ width: "100%" }}>
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
                    ]}
                  >
                    <View
                      style={[
                        styles.modalView,
                        { width: "92.5%" },
                        { height: "70%" },
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
                        <LineChart
                          data={weeklybalance}
                          width={350}
                          height={256}
                          verticalLabelRotation={30}
                          chartConfig={chartConfig}
                          bezier
                        />
                      </View>
                      <Pressable
                        style={[
                          styles.button,
                          styles.buttonClose,
                          { marginBottom: 20 },
                        ]}
                        onPress={() => {
                          navigation.navigate("BalanceDetails");
                        }}
                      >
                        <Text style={styles.textStyle}>More Details</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible1(!modalVisible1)}
                      >
                        <Text style={styles.textStyle}>Hide</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible1(true)}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {today} TND
                  </Text>
                </Pressable>
              </View>
            </View>

            <Card.Title style={{ fontSize: 24, marginTop: 20 }}>
              {balance} Today's Profit
            </Card.Title>
          </Card>
        </View>
        <TouchableOpacity
          style={{
            borderRadius: 70,
            width: 70,
            height: 70,
            marginTop: 60,
            backgroundColor: theme.colors.surface,
            alignSelf: "flex-end",
            marginEnd: 30,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#a9a9a9a",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 80,
            shadowOffset: { width: 1, height: 80 },
          }}
          onPress={()=>{}}
        >
          <Feather name="bell" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
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
  Tabhead: { height: 40, backgroundColor: theme.colors.primary },
  TabHeadertext: { margin: 6, color: "white", textAlign: "center" },
  Tabtext: {
    margin: 6,
    color: theme.colors.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
});
