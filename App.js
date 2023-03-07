import React, { useEffect, useState } from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StartScreen,
  LoginScreen,
  SignupMode,
  SplashScreen,
  DriverSignUp,
  AgentSignUp,
  AdminSignUp,
  ResetPasswordScreen,
  DriverDashboard,
  AgentDashboard,
  
  DriverReservationM1,
  
  QrMapScreenM1,
  
  LoginScreenNoGoBack,
  DriverPayment,
  QrcodeM1,
  
  AdminDashboard,
  ManageParkings,
  ManageAgents,
  Fidelity,
  MessagesScreen,
  ChatScreen,
  ModifyReservation,
  AddParking
} from "./src/screens";
import { theme } from "./src/core/theme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupMode" component={SignupMode} />
          <Stack.Screen name="DriverSignUp" component={DriverSignUp} />
          <Stack.Screen name="AgentSignUp" component={AgentSignUp} />
          <Stack.Screen name="AdminSignUp" component={AdminSignUp} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
          <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
          <Stack.Screen name="AgentDashboard" component={AgentDashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="DriverReservationM1" component={DriverReservationM1}/>
          <Stack.Screen name="QrMapScreenM1" component={QrMapScreenM1} />
          <Stack.Screen name="DriverPayment" component={DriverPayment} />
          <Stack.Screen name="QrcodeM1" component={QrcodeM1} />
          <Stack.Screen name="LoginScreenNoGoBack" component={LoginScreenNoGoBack}/>
          <Stack.Screen name="ManageAgents" component={ManageAgents} />
          <Stack.Screen name="ManageParkings" component={ManageParkings} />
          <Stack.Screen name="FidelityPts" component={Fidelity} />
          <Stack.Screen name="ReviewsScreen" component={MessagesScreen} />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={({ route }) => ({
              title: route.params.userName,
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen name="ModifyReservation" component={ModifyReservation} />
          <Stack.Screen name="AddParking" component={AddParking} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
