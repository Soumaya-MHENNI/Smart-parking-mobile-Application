import React, { useState , useEffect} from "react";
import Logo from "../components/Logo";
import { theme } from "../core/theme";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert
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
import { Title, Caption, List, IconButton, TextInput } from "react-native-paper";

export default function AgentProfile({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [ currentpwd, setCurrentpwd ] = useState({ value: '', error: '' })
  const [ newpwd, setNewpwd ] = useState({ value: '', error: '' })
  const [ confirmpwd, setConfirmpwd ] = useState({ value: '', error: '' })

  const [ personalInfo, setPersonalInfo ] = useState('')
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AgentProfilePersonalInfo');
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
  
  for(let i=0; i<data.length; i++){
    var firstname = data[i][0]
    var lastname = data[i][1]
    var cin = data[i][2]
    var email = data[i][3]
    var initials = data[i][0][0].concat(data[i][1][0])
  }
  
  
  const onChangePressed = async () => {

    const currentpwdError = passwordValidator(currentpwd.value)
    const newpwdError = passwordValidator(newpwd.value)
    const confirmpwdError = passwordValidator(confirmpwd.value)

    if (currentpwdError|| newpwdError || confirmpwdError) {
      setCurrentpwd({ ...currentpwd, error: currentpwdError })
      setNewpwd({ ...newpwd, error: newpwdError })
      setConfirmpwd({...confirmpwd, error: confirmpwdError})
      return
    }

    console.log(newpwd)
    console.log(confirmpwd)

    if( newpwd.value === confirmpwd.value){
      await fetch('http://192.168.42.157:3001/ResetAgentPassword', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        password: newpwd.value
      })
      
    })

    Alert.alert("Your password has been reset successfully!")
    }
    else{
      Alert.alert("You didn't confirm your password correctly!")
    }
    

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
            style={{
              alignItems: "flex-start",
              marginTop: 35,
              marginStart: 30,
            }}
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
            <Title style={styles.title}>Hazem Hsairi</Title>
            <Caption style={styles.caption}>Hazem.Hsairi@gmail.com</Caption>
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
                    <Text> {firstname}</Text>
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
                 
                </List.Accordion>

                {/*<List.Accordion
                  style={{ alignItems: "flex-start", width: 340 }}
                  title="Bank Account"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="bank"
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
                    <Text style={{ fontWeight: "bold" }}>RIB:</Text>
                    <Text> 12358796541XXXXXXXXX</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Credit Card Number:
                    </Text>
                    <Text> XXXXXXX</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Account Type:</Text>
                    <Text> Saving Account</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 28,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Bank:</Text>
                    <Text> ----</Text>
                  </View>
                  <View
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
                  </View>
                  </List.Accordion>*/}

                <List.Accordion
                  style={{ alignItems: "flex-start", width: 340 }}
                  title="Login Settings"
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
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Email:</Text>
                    <Text> {email}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      paddingStart: 130,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ paddingTop: 10, fontWeight: "bold" }}>
                      Reset Password
                    </Text>
                    <IconButton
                      icon="playlist-edit"
                      color={theme.colors.primary}
                      size={20}
                      onPress={() => {setModalVisible(true)}}
                    />
                  </View>
                </List.Accordion>
              </ScrollView>
            </KeyboardAvoidingView>
            
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
                    <View style={{ height: 100, width: 400}}> 
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.primary, marginStart: 60, marginBottom:30 }}>Reset Password</Text>                   
                    <TextInput
                    style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60, height: 50, marginBottom: 20}}
                      label="Current Password"
                      mode='outlined'
                      returnKeyType="next"
                      value={currentpwd.value}
                      onChangeText={(text) => setCurrentpwd({ value: text, error: '' })}
                      error={!!currentpwd.error}
                      errorText={currentpwd.error}
                      secureTextEntry
                    />
                    <TextInput
                    style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60, height: 50, marginBottom:20}}
                      label="New Password"
                      mode='outlined'
                      returnKeyType="next"
                      value={newpwd.value}
                      onChangeText={(text) => setNewpwd({ value: text, error: '' })}
                      error={!!newpwd.error}
                      errorText={newpwd.error}
                      secureTextEntry
                    />
                    <TextInput
                    style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60, height: 50, marginBottom: 30}}
                      label="Confirm New Password"
                      mode='outlined'
                      returnKeyType="done"
                      value={confirmpwd.value}
                      onChangeText={(text) => setConfirmpwd({ value: text, error: '' })}
                      error={!!confirmpwd.error}
                      errorText={confirmpwd.error}
                      secureTextEntry
                    />
                  </View>
                  </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose, { marginBottom: 10}]}
                    onPress={() => onChangePressed()}
                  >
                    <Text style={styles.textStyle}>Change</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    
  },
  buttonClose: {
    backgroundColor: theme.colors.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: "100%",
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
  },
  Tabcontainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
});
