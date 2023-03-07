import React, { useState, useEffect } from "react";
import DatePicker from "react-native-datepicker";
import TimePicker from "react-native-24h-timepicker";
import { theme } from "../core/theme";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function ModifyReservation ({...props}) {
  const [ date, setdate ] = useState('')
  const [ time, setTime ] = useState('')
  const [ licencePlate, setLicencePlate ] = useState('')
  const [ cin, setCin ] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch ('http://192.168.42.157:3001/DriverProfilePersonalInfo');
      const result = await response.json();
      //console.log(result)
      setCin(JSON.stringify(result).substr(57,8))
    }
    fetchData();
  },[]);

  console.log(cin)

  
  const onMakeResPressed = async () =>{

    await fetch('http://192.168.42.157:3001/MakeReservation', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        cinRes: parseInt(cin),
        dateRes: date,
        timeRes: time,
        MatRes: licencePlate
      })
      
    })
    
  }

  const onCancelTime = () => {
    this.TimePicker.close();
  }

  const onConfirmTime = (hour, minute) => {
    setTime(`${hour}:${minute}`);
    this.TimePicker.close();
  }

  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
  });

  const textInputChange = (val) => {
    if (val.length == 11) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  
  const [ reservations, setReservations ] = useState('')
    
    useEffect(() => {
        async function fetchData() {
          const response = await fetch ('http://192.168.42.157:3001/DriverAllReservations');
          const result = await response.json();
          //console.log(result)
          setReservations(result)
        }
        fetchData();
    },[]);

    var data2 = []

    for(let i=0; i< reservations.length; i++ ){
        data2.push(Object.values(reservations[i]))
    }
    //console.log(data)

   
    var initList = []
    var ResList = []

    for(let i=0; i<data2.length; i++){
        initList.push([data2[i][0], data2[i][1].substr(0, 10), data2[i][2].substr(0, 5), data2[i][3], data2[i][4]])
    }
    console.log(initList)
    
    const index = props.route.params.index
    console.log(index)
    ResList = initList.map((key) => {

        const onDeletePressed = async () => {
        
            await fetch('http://192.168.42.157:3001/DeleteReservation', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                resId : key[4]
                
            })
            
            })
        }
        console.log(key[4])
        if(key[4] === index ){
            return (
                <Button key={key[4]}
                style={{
                  backgroundColor: theme.colors.primary,
                  height: 50,
                  width: 250,
                  borderRadius: 20,
                  justifyContent: "center",
                }}
                onPress={() => {
                    onDeletePressed();
                    onMakeResPressed();
                    
                  Alert.alert(
                    "Success",
                    "Your reservation was modified successfully",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          props.navigation.navigate("DriverHome");
                        },
                      },
                    ]
                  );
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: theme.colors.surface,
                  }}
                >
                  Modify Reservation
                </Text>
              </Button>
            )
        }
        
    })
    



  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginTop: 40, marginStart: 30 }}
        onPress={props.navigation.goBack}
      >
        <Ionicons name="chevron-back" size={24} color={theme.colors.surface} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.text_header}> Modify Reservation </Text>
      </View>

      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        useNativeDriver={true}
      >
        <Text style={styles.text_footer}>Licence Plate:</Text>
        <View style={styles.action}>
          <FontAwesome
            name="car"
            size={20}
            color={theme.colors.primary}
            style={{ paddingBottom: 10, paddingLeft: 10 }}
          />
          <TextInput
            placeholder=" e.g. 111 TU 1111"
            placeholderTextColor="grey"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => {setLicencePlate(val); textInputChange(val)}}
          />
          {data.check_textInputChange ? (
            <Feather
              name="check-circle"
              color={theme.colors.primary}
              size={20}
            />
          ) : null}
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}
        >
          Reservation Date:
        </Text>
        <View style={styles.container1}>
        <DatePicker
        style={{width: 200, paddingLeft: 10}}
        date={date}
        mode="date"
        placeholder="Pick a date"
        placeholderTextColor= "#808080"
        format="YYYY-MM-DD"
        minDate="2021-01-01"
        maxDate="2021-12-30"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        
        customStyles={{
          dateIcon: {
            
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            overlayColor: theme.colors.primary

          },
          dateInput: {
            marginLeft: 36,
            borderRadius: 10,
            borderColor: "#A9A9A9"
          }
         
        }}
        onDateChange={(date) => {setdate(date)}}
      />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}
        >
          Arrival Time:
        </Text>
        <View style={styles.container1}>
        <View style={styles.timecontainer}>
         <View style={styles.action}>
         <Feather
                name="clock"
                color={theme.colors.primary}
                size={30}
                onPress={() => this.TimePicker.open()}
                />
 

       <Text style={styles.text}>
         {time}</Text>
         
        <TimePicker
        
        
          ref={ref => {
            this.TimePicker = ref;
          }}
          
          onCancel={() => onCancelTime()}
          onConfirm={(hour, minute) => onConfirmTime(hour, minute)}
        />
         
   </View>
        
        
      </View>
        </View>

        <View style={[styles.button, { marginButtom: 20 }]}>
        {ResList}
        </View>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  

  timecontainer: {
   
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 20
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container1: {
    backgroundColor: theme.colors.surface,
  },
  header: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    //paddingVertical:150,
    paddingHorizontal: 10,
  },

  title: {
    color: "#0000A0",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 50,
    alignSelf: "center",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  text_footer: {
    color: theme.colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 20,
    color: "#000000",
  },
});
