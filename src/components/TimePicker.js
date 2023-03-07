import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text ,TextInput,Button,Icon} from "react-native";
import TimePicker from "react-native-24h-timepicker";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from "../core/theme";

export default class MyTimePicker extends Component {
  constructor() {
    super();
    this.state = {
      time: ""
    };
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  render() {
    return (
      <View style={styles.container}>
         <View style={styles.action}>
         <Feather
                name="clock"
                color={theme.colors.primary}
                size={30}
                onPress={() => this.TimePicker.open()}
                />
 

       <Text style={styles.text}>
         {this.state.time}</Text>
         
        <TimePicker
        
        
          ref={ref => {
            this.TimePicker = ref;
          }}
          
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
         
   </View>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 20
  },
  text: {
    fontSize: 20,
    paddingLeft: 40,
    color: '#000000',
    
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.error,
    paddingHorizontal: 50,
    borderRadius: 3,
    alignItems: "center",
   
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
textInput: {
  flex: 1,
  
  paddingLeft: 50,
  color: '#05375a',
},
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});
