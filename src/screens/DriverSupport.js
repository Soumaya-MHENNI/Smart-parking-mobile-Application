import React, { useState } from "react";
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
import { List, TextInput } from "react-native-paper";
import { createDrawerNavigator } from "react-navigation-drawer";
import { SideBar } from "../components/SideBar";

export default function DriverSupport({ navigation }) {

  const [ content, setContent ] = useState({value: ''})
  const [ subject, setSubject ] = useState({value:''})

  const onSendPressed = async () =>{
    await fetch('http://192.168.42.157:3001/DriverSupportReviews', {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      SubjectRev: subject.value,
      ContentRev: content.value,
      msgDateTime: new Date()
    })
    
  })
  this.textInput.clear()
  this.textField.clear()
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
          height: 80,
          width: 412,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "flex-start", marginTop: 35, marginStart: 30 }}
          onPress={navigation.openDrawer}
        >
          <FontAwesome name="bars" size={24} color={theme.colors.surface} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            marginStart: 120,
            marginTop: 15,
            alignSelf: "center",
            fontWeight: "bold",
            color: theme.colors.surface,
          }}
        >
          Support
        </Text>

        <Image
          style={styles.image}
          source={require("../assets/LogoNoText.png")}
        />
      </View>
      <Image
        style={{ height: 100, width: 100, alignSelf: "center", marginTop: 20 }}
        source={require("../assets/Logo.png")}
      />
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          alignSelf: "center",
          color: theme.colors.secondary,
          marginTop: 20,
        }}
      >
        How can we help you?
      </Text>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TextInput
        ref={input => { this.textField = input }}
          style={{
            backgroundColor: theme.colors.surface,
            width: 300,
            paddingBottom: 10,
          }}
          label="Subject"
          returnKeyType="done"
          mode="outlined"
          onChangeText={(text) => setSubject({value: text})}
          placeholderTextColor="#3891c0"
        />
        <TextInput
          ref={input => { this.textInput = input }}
          style={{
            backgroundColor: theme.colors.surface,
            width: 300,
          }}
          label="Describe your issue"
          placeholderTextColor="#3891c0"
          returnKeyType="done"
          mode="outlined"
          onChangeText={(text) => setContent({value: text})}
          multiline={true}
          numberOfLines={5}
        />
        <TouchableOpacity
          
          style={{ marginTop: 24, width: 100, marginStart: 200, backgroundColor: theme.colors.primary, alignItems:'center',height: 50, borderRadius:10 }}
          onPress={onSendPressed}
        >
          <Text style={{ color: theme.colors.surface, fontWeight:'bold', marginTop: 10, fontSize:17}}>SEND</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 100,
          marginStart: 50,
          color: theme.colors.secondary,
        }}
      >
        Contact:
      </Text>
      <View style={{ marginStart: 60, marginTop: 20, flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Email: </Text>
        <Text>Contact@partorre.com</Text>
      </View>
      <View style={{ marginStart: 60, marginTop: 20, flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Phone: </Text>
        <Text>27715816</Text>
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
    marginStart: 120,
    marginTop: 30,
  },
});
