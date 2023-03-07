import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Linking,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { theme } from "../core/theme";
import { FontAwesome } from "@expo/vector-icons";
import Logo from "../components/Logo";
export default function AgentPhoneCall({ navigation }) {
  const makeCall1 = () => {
    let phoneNumber = `tel:${54069100}`;
    Linking.openURL(phoneNumber);
  };

  const makeCall2 = () => {
    let phoneNumber2 = `tel:${197}`;
    Linking.openURL(phoneNumber2);
  };
  const makeCall3 = () => {
    let phoneNumber3 = `tel:${74747474}`;
    Linking.openURL(phoneNumber3);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
          height: 80,
          width: 415,
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
            marginStart: 100,
            marginTop: 15,
            alignSelf: "center",
            fontWeight: "bold",
            color: theme.colors.surface,
          }}
        >
          Emergency Calls
        </Text>

        <Image
          style={styles.image}
          source={require("../assets/LogoNoText.png")}
        />
      </View>
      <View style={{ alignSelf: "center", marginTop: 90 }}>
        <Logo />
      </View>
      <View style={{ marginTop: 100 }}>
        <TouchableOpacity
          onPress={makeCall3}
          activeOpacity={0.7}
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
            height: 50,
            width: 250,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            alignSelf: "center",
          }}
        >
          <Text style={styles.TextStyle}> Administration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={makeCall1}
          activeOpacity={0.7}
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
            height: 50,
            width: 250,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text style={styles.TextStyle}> Maintenance Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={makeCall2}
          activeOpacity={0.7}
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
            height: 50,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          <Text style={styles.TextStyle}> Police</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    marginStart: 90,
    marginTop: 30,
  },
  TextStyle: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
