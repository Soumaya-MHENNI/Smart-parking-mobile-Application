import React, { useState } from "react";
import LoginScreenNoGoBack from "./LoginScreenNoGoBack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AgentPhoneCall from "./AgentPhoneCall";
import DrawerContent from "./DrawerContent";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { theme } from "../core/theme";
import AgentDrawer from "./AgentDrawer";
import AgentHome from "./AgentHome";
import BalanceDetails from "./BalanceDetails";
import AgentProfile from "./AgentProfile";
const Drawer = createDrawerNavigator();

export default function AgentDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Drawer.Navigator drawerContent={(props) => <AgentDrawer {...props} />}>
        <Drawer.Screen name="AgentHome" component={AgentHome} />
        <Drawer.Screen name="AgentProfile" component={AgentProfile} />
        <Drawer.Screen name="BalanceDetails" component={BalanceDetails} />
        <Drawer.Screen name="Phone Call" component={AgentPhoneCall} />
      </Drawer.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
  },
});
