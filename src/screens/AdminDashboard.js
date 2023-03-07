import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
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
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { theme } from "../core/theme";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/AntDesign";

const parkingIcon = <Icon name="parking" size={28} color="#3891c0" />;
const ReviewsIcon = <Icon2 name="customerservice" size={28} color="#3891c0" />;
const AgentIcon = <Icon name="user-shield" size={28} color="#3891c0" />;

export default function AdminDashboard({ navigation }) {


  const [ nbParking, setNbParking ] = useState('')
  const [ nbAgent, setNbAgent ] = useState('')
  const [ nbUnRev, setnbUnRev ] = useState('')
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AdminNbParkingsButton');
      const result = await response.json();
      //console.log(result)
      setNbParking(JSON.stringify(result))
    }
    fetchData();
  },[]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AdminNbAgentButton');
      const result = await response.json();
      //console.log(result)
      setNbAgent(JSON.stringify(result))
    }
    fetchData();
  },[]);useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/UnreadReviewsButton');
      const result = await response.json();
      //console.log(result)
      setnbUnRev(JSON.stringify(result))
    }
    fetchData();
  },[]);


  
  const weeklybalance = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [95, 45, 28, 80, 99, 43, 123],
      },
    ],
  };
  

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
        <Image
          style={{
            alignItems: "flex-start",
            width: 60,
            height: 30,
            marginTop: 35,
            marginStart: 30,
          }}
          source={require("../assets/LogoTalan.png")}
        />

        <Text
          style={{
            fontSize: 15,
            marginStart: 70,
            marginTop: 15,
            alignSelf: "center",
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          Dashboard
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
          marginTop: 70,
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
                <TouchableOpacity
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => navigation.navigate("ManageParkings")}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      color: "white",
                      textAlign: "center",
                    }}
                  >

                   
                    {nbParking}

                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Card.Title style={{ fontSize: 24, marginTop: 20 }}>
              {parkingIcon} Parkings
            </Card.Title>
          </Card>
          <Card containerStyle={{ borderRadius: 15 }}>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => navigation.navigate("ManageAgents")}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {nbAgent}
                </Text>
              </TouchableOpacity>
            </View>

            <Card.Title style={{ fontSize: 24, marginTop: 20 }}>
              {AgentIcon} Agents
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
                      <ScrollView
                        style={[
                          styles.Tabcontainer,
                          { width: "92.5%" },
                          { height: "70%" },
                        ]}
                      ></ScrollView>

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
                  onPress={() => navigation.navigate('ReviewsScreen')}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {nbUnRev} reviews
                  </Text>
                </Pressable>
              </View>
            </View>

            <Card.Title style={{ fontSize: 24, marginTop: 20 }}>
              {ReviewsIcon} Customer Reviews
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
            paddingEnd: 5,
            justifyContent: "center",
            shadowColor: "#a9a9a9a",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 80,
            shadowOffset: { width: 1, height: 80 },
          }}
          onPress={() => navigation.navigate("LoginScreenNoGoBack")}
        >
          <SimpleLineIcons name="logout" size={24} color={theme.colors.primary} />
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
    marginStart: 100,
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
