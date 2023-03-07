import React, { useState, useEffect } from "react";
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
import SearchBar from '../components/SearchBar'
import { ScrollView } from "react-native";


export default function BalanceDetails({navigation}){
  const [ searchbar, setSearchbar ] = useState(false)
  const [ search, setSearch ] = useState('')
  const [ balanceDetail, setBalanceDetail ] = useState('')
  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/AgentBalanceDetails');
      const result = await response.json();
      //console.log(result)
      setBalanceDetail(result)
    }
    fetchData();
  },[]);

  var data = []
  for(let i=0;i<balanceDetail.length;i++){
    data.push(Object.values(balanceDetail[i]))

  }
  //console.log(data)

  var detail = []
  for(let i=0; i<data.length;i++){
    detail.push([data[i][0], data[i][1], data[i][2].concat(" ").concat(data[i][3]), data[i][4], data[i][5].substr(0,10)])
  }

  //console.log(detail)
  const state = {
        tableHead: ["Tr N°", "Amount", "Client", "Licence Plate", "Date"],
        tableData: detail,
      };

  const searchFilter = (text) => {
    if(text){
      const newdata = detail.filter((item) => !item[4].search(text))
      setSearch(newdata)
      setSearchbar(true)
    }else{
      setSearchbar(false)
    }
    
  }

  const searchedData = {
    tableHead: ["Tr N°", "Amount", "Client", "Licence Plate", "Date"],
    tableData: search,
  }
    return(
        <View style={{backgroundColor: theme.colors.surface, flex: 1}}>
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
                marginStart: 125,
                marginTop: 15,
                alignSelf: "center",
                fontWeight: "bold",
                color: theme.colors.primary,
            }}
            >
            Balance
            </Text>

            <Image
            style={styles.image}
            source={require("../assets/LogoNoText.png")}
            />
        </View>
        <View style={{marginTop: 150, marginStart: 50, marginEnd: 70}}>
        <SearchBar onChangeText={(text) => searchFilter(text)}></SearchBar>
        </View>
        <View style={{marginTop: 50}}>
        <ScrollView >  
        <Table
        style={{width: 390, alignSelf: 'center'}}
        >
            <Row
            data={state.tableHead}
            style={{borderBottomWidth: 1, borderBottomColor: 'rgba(52, 52, 52, 0.1)'}}
            textStyle={styles.TabHeadertext}
            />
            {!searchbar ?(
              <Rows
              data={state.tableData}
              style={{borderBottomWidth: 1, borderBottomColor: 'rgba(52, 52, 52, 0.1)'}}
              textStyle={styles.Tabtext}
              />
            ):(
              <Rows
            data={searchedData.tableData}
            style={{borderBottomWidth: 1, borderBottomColor: 'rgba(52, 52, 52, 0.1)'}}
            textStyle={styles.Tabtext}
            />
            )}
            
        </Table>
        </ScrollView>  
        </View>
    </View>
    )
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
    Tabhead: { height: 40, backgroundColor: theme.colors.surface, borderBottomColor: '#a9a9a9' },
    TabHeadertext: { margin: 6, color: theme.colors.text, textAlign: "center", fontWeight: "bold"},
    Tabtext: {
      margin: 6,
      color: theme.colors.text,
      textAlign: "center",
      
    },
  });
  