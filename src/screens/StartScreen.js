import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
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
import theme from "../core/theme";
import Paragraph from "../components/Paragraph";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <View style={{ width: "100%", marginTop: 50, alignItems: "center" }}>
        <Logo />
        {/*<Header>Login Mode</Header>*/}
        <Paragraph>Welcome To PARTORRE the future of parking.</Paragraph>
        <View style={{ width: "100%", paddingTop: 60, alignItems: "center" }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Login
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("DriverSignUp")}
          >
            Sign Up
          </Button>
        </View>
      </View>
      <View>
        <Text style={styles.text}>Powered By</Text>
        <Image
          source={require("../assets/LogoTalan.png")}
          style={styles.talan}
        />
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 300,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 26,
    textAlign: "center",
    marginTop: 50,
  },
  talan: {
    width: 50,
    height: 30,
    alignSelf: "center",
  },
});
