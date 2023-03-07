import React, { useState } from 'react'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { theme } from '../core/theme'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import { List, TextInput } from 'react-native-paper';


export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.container}>
    <TouchableOpacity  style={styles.imageLayout} onPress={navigation.goBack}>
              <Image
              style={styles.image}
              source={require('../assets/BackArrow.png')}
              />
          </TouchableOpacity>
          
          <View style={{ alignSelf: 'center', marginTop: 200}}>
          <Logo/>
          </View>
      <ScrollView>
      <KeyboardAvoidingView >
      <View style={{alignSelf: 'center'}}>
      <Header>Reset Password</Header>
      </View>
      <TextInput
        style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
        mode='outlined'
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Text style={{marginStart: 63}}>You will receive an email with a password </Text>
      <Text style={{marginStart: 66}}>reset link.</Text>
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 24, width: 200, alignSelf: 'center' }}
      >
        Send
      </Button>
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,

    
  },
  imageLayout: {
      position: 'absolute',
      top: 10 + getStatusBarHeight(),
      left: 4,
      marginStart: 30
    },
    image: {
      width: 24,
      height: 24
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
      marginStart: 90
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    scrollView: {
      backgroundColor: theme.colors.surface,
    },
})
