import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  RefreshControl,
  
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../components/MessageStyles";
import { theme } from "../core/theme";
import { ChatScreen } from "./ChatScreen";
import { ScrollView } from "react-native";
import { Content } from "native-base";


export default function MessagesScreen({ navigation }) {
  const [ ReviewList, setReviewList ]= useState('')
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AdminReviewList');
      const result = await response.json();
      //console.log(result)
      setReviewList(result)
    }
    fetchData();
  },[])
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
const [refreshing, setRefreshing] = React.useState(false);

const onRefresh =  React.useCallback( async ()  => {
    setRefreshing(true);
    const response = await fetch ('http://192.168.42.157:3001/AdminReviewList');
      const result = await response.json();
      //console.log(result)
      setReviewList(result)
    
    wait(2000).then(() => setRefreshing(false));
}, []);
  
  const data = ReviewList
  console.log(data)
  return (
    <View style={{ backgroundColor: theme.colors.surface}} >
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
          style={styles.imageLayout}
          onPress={() => navigation.navigate('AdminDashboard')}
        >
          <Image
            style={styles.image1}
            source={require("../assets/BackArrow.png")}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 15,
            marginStart: 85,
            marginTop: 15,
            alignSelf: "center",
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          Customer Reviews
        </Text>

        <Image
          style={styles.image}
          source={require("../assets/LogoNoText.png")}
        />
      </View>
      
      <View  style={{flex:1, paddingLeft: 20, paddingRight:20, alignItems: 'center', backgroundColor: theme.colors.surface, paddingTop: 70, position: 'absolute', height: 1000, width: 410, alignSelf:'center', marginTop: 50}}>
        <Content 
        padder
        contentContainerStyle={{flex: 1}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <FlatList

          data={ReviewList}
          keyExtractor={(item) => item.idReview.toString()}
          renderItem={({ item }) => (
            
              <TouchableOpacity 
              style={{ flexDirection: 'row', justifyContent:'space-between'}}
              onPress={() => navigation.navigate('ChatScreen', { userName: item.username, cin: item.CIN_SD, Revid: item.idReview })}
              >
                
                <LinearGradient
                            style={{height: 50, width: 50, borderRadius: 30, alignSelf: 'flex-start'}}
                            colors={["#00FFFF", "#37B6FF", "#3891c0", "#5C7EE6"]}
                            >
                            
                            <Text style={{ position: 'absolute', marginTop: 12, alignSelf: 'center', fontWeight: 'bold', color: theme.colors.surface, fontSize: 17}}> {item.username.split(' ')[0][0]}{item.username.split(' ')[1][0]} </Text>
                </LinearGradient>
                
                <View style={{flexDirection: 'column', justifyContent: 'center', padding: 15, paddingLeft:0, marginLeft: 10, width: 300, borderBottomWidth: 1, borderBottomColor: '#cccccc'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: theme.colors.primary}}>{item.username}</Text>
                    <Text style={{fontSize:12, color: '#666'}}>{item.messageTime1}</Text>
                  </View>
                  <Text style={{fontSize: 14, color: '#333333'}}>{item.messageText}</Text>
                </View>
              </TouchableOpacity>
            
          )}
        />
        </Content>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface
  },
  text: { margin: 6 },
  image: {
    width: 30,
    height: 30,
    marginStart: 70,
    marginTop: 35,
  },
  row: { flexDirection: "row", width: 470, height: 100 },

  image1: {
    width: 30,
    height: 30,
    marginStart: 30,
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

  Tabhead: {
    height: 40,
    width: 410,
    backgroundColor: theme.colors.surface,
    borderBottomColor: "#a9a9a9",
  },
  TabHeadertext: {
    margin: 6,
    color: theme.colors.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
  Tabtext: {
    color: theme.colors.text,
    margin: 10,
    textAlign: "left",
    fontWeight: "200",
  },
});
