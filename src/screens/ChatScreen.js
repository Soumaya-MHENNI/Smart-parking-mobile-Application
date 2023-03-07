import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet, ListViewComponent, Image } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { theme } from "../core/theme";
import InvertibleScrollView from 'react-native-invertible-scroll-view'
import { SafeAreaView } from "react-native";
import { Container } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler'
const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState('')

  const username = props.route.params.userName
  const cin = props.route.params.cin
  const revId = props.route.params.Revid

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://192.168.42.157:3001/AdminChatScreen', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        cin: cin
      })
      
    });
      const result = await response.json();
      //console.log(result)
      setMessages(result)
    }
    fetchData();
    
  },[])

  
  const onSend =  useCallback( async (messages = [])  => {
    setMessages((previousMessages) =>
      GiftedChat.append(messages, previousMessages)
    );

    await fetch('http://192.168.42.157:3001/AdminReply', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        reply: messages,
        cin: cin,
        
      })
      
    });

  },[])

  
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#3891c0"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        
        wrapperStyle={{
          
          left:{
            backgroundColor: '#DCDCDC',
            marginBottom: 10
          },
          right: {
            backgroundColor: theme.colors.primary,
            marginBottom:10
          }
        }}
        textStyle={{
          
          left:{
            color: theme.colors.text 
          },
          right: {
            color: theme.colors.surface,
          }
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    
    <Container style={{paddingTop:10}}>
      <TouchableOpacity
      style={{marginBottom:10}}
          onPress={props.navigation.goBack}
        >
          <Image
            style={styles.image1}
            source={require("../assets/BackArrow.png")}
          />
        </TouchableOpacity>
    <GiftedChat
      inverted={false}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 13013425,
        name: "Soumaya Mhenni"
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      
    />
    </Container>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  image1: {
    width: 30,
    height: 30,
    marginStart: 30,
    marginTop: 35,
  },

});
