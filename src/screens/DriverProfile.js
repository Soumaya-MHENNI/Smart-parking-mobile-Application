import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { theme } from "../core/theme";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { FontAwesome } from "@expo/vector-icons";

import { createDrawerNavigator } from "react-navigation-drawer";
import { SideBar } from "../components/SideBar";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Caption, List, IconButton } from "react-native-paper";
export default function DriverProfile({ navigation }) {

  const [ personalInfo, setPersonalInfo ] = useState('')
  const [ CarFeatures, setCarFeatures ] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/DriverProfilePersonalInfo');
      const result = await response.json();
      //console.log(result)
      setPersonalInfo(result)
    }
    fetchData();
  },[]);

  var data = []
  for(let i=0; i< personalInfo.length; i++ ){
    data.push(Object.values(personalInfo[i]))
  }
  console.log(data)
  for(let i=0; i<data.length; i++){
    var firstname = data[i][0]
    var lastname = data[i][1]
    var cin = data[i][2]
    var email = data[i][3]
    var initials = data[i][0][0].concat(data[i][1][0])
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/DriverProfileCarFeatures');
      const result = await response.json();
      //console.log(result)
      setCarFeatures(result)
    }
    fetchData();
  },[]);

  var car = []
  for(let i=0; i< CarFeatures.length; i++ ){
    car.push(Object.values(CarFeatures[i]))
  }
  for(let i=0; i<car.length; i++){
    var licenceplate = car[i][0]
    var size = car[i][1]
    var color = car[i][2]
    var brand = car[i][3]
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#00FFFF", "#37B6FF", "#3891c0", "#5C7EE6"]}
        style={styles.container}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            height: 80,
            width: 412,
            flexDirection: "row",
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
              marginStart: 130,
              marginTop: 15,
              alignSelf: "center",
              fontWeight: "bold",
              color: theme.colors.primary,
            }}
          >
            Profile
          </Text>

          <Image
            style={styles.image}
            source={require("../assets/LogoNoText.png")}
          />
        </View>
        <LinearGradient
          style={styles.imageHolder}
          colors={["#00FFFF", "#37B6FF", "#3891c0", "#5C7EE6"]}
        >
         
          <Text style={{ position: 'absolute', marginTop: 14, alignSelf: 'center', fontWeight: 'bold', color: theme.colors.surface, fontSize: 70}}>{initials}</Text>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            marginTop: 200,
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
            marginStart: 30,
            marginEnd: 30,
            backgroundColor: theme.colors.surface,
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 1, marginTop: 80, marginBottom: 55 }}>
            <Title style={styles.title}>{firstname} {lastname}</Title>
            <Caption style={styles.caption}>{email}</Caption>
            <KeyboardAvoidingView
              behavior={Platform.OS === "android" ? "padding" : null}
            >
              <ScrollView style={styles.scrollView}>
                <List.Accordion
                  style={{ alignItems: "flex-start", width: 340 }}
                  title="Personal Information"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="account"
                      color={theme.colors.primary}
                      style={styles.link}
                    />
                  )}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>First Name:</Text>
                    <Text> {firstname} </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Last Name:</Text>
                    <Text> {lastname}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>CIN:</Text>
                    <Text> {cin}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Email:</Text>
                    <Text> {email}</Text>
                  </View>
                  {/*<View
                    style={{
                      flexDirection: "row",
                      paddingStart: 200,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ paddingTop: 10, fontWeight: "bold" }}>
                      Edit
                    </Text>
                    <IconButton
                      icon="playlist-edit"
                      color={theme.colors.primary}
                      size={20}
                      onPress={() => {}}
                    />
                  </View>*/}
                </List.Accordion>

                <List.Accordion
                  style={{ alignItems: "flex-start", width: 340 }}
                  title="Car Features"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="car"
                      color={theme.colors.primary}
                      style={styles.link}
                    />
                  )}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Licence Plate:</Text>
                    <Text> {licenceplate}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Size:</Text>
                    <Text> {size}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Color:</Text>
                    <Text> {color}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Brand:</Text>
                    <Text> {brand}</Text>
                  </View>
                  {/*<View
                    style={{
                      flexDirection: "row",
                      paddingStart: 200,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ paddingTop: 10, fontWeight: "bold" }}>
                      Edit
                    </Text>
                    <IconButton
                      icon="playlist-edit"
                      color={theme.colors.primary}
                      size={20}
                      onPress={() => {}}
                  />
                  </View>*/}
                </List.Accordion>
                {/*<List.Accordion
                  style={{ alignItems: "flex-start", width: 340 }}
                  title="History"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="history"
                      color={theme.colors.primary}
                      style={styles.link}
                    />
                  )}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                      textAlign: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                      Reservations: {"\n\n"}
                      <Text style={{ fontWeight: "normal" }}>12/07/2018</Text>
                    </Text>
                  </View>
                  </List.Accordion>*/}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </LinearGradient>
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
    marginStart: 125,
    marginTop: 30,
  },
  avatar: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    marginBottom: 100,
    alignSelf: "center",
    marginTop: 6,
  },
  imageHolder: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "transparent",
    marginBottom: 100,
    alignSelf: "center",
    marginTop: 200,
    zIndex: 999,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    alignSelf: "center",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    alignSelf: "center",
  },
  scrollView: {
    backgroundColor: theme.colors.surface,
    borderRadius: 30,
    overflow: "scroll",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
