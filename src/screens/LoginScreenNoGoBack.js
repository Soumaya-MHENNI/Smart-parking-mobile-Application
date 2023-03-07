import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, KeyboardAvoidingView, Image, ScrollView, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import {getStatusBarHeight} from 'react-native-status-bar-height'

export default function LoginScreenNoGoBack({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    // driver login
    const response = await fetch('http://192.168.42.157:3001/LoginClient', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        login: email.value,
        password: password.value
      })
      
    })
    
    
    const result = JSON.stringify(response)
    
    //var data = result.search(/"content-length":"?"/)
    //console.log(data)
  
    // Agent login
    const response1 = await fetch('http://192.168.42.157:3001/LoginAgent', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        login: email.value,
        password: password.value
      })
      
    })
    
    
    const result1 = JSON.stringify(response1)

    //Admin login
    const response2 = await fetch('http://192.168.42.157:3001/LoginAdmin', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        login: email.value,
        password: password.value
      })
      
    })
    
    
    const result2 = JSON.stringify(response2)

    console.log(result.substr(75, 20)[19])
    console.log(result1.substr(75, 20)[19])
    console.log(result2.substr(75, 20)[19])
    
    if(result.substr(75, 20)[19]==='"'){

      navigation.reset({
        index: 0,
        routes: [{ name: 'DriverDashboard' }],
      })
    }
    if(result1.substr(75, 20)[19]==='"'){

      navigation.reset({
        index: 0,
        routes: [{ name: 'AgentDashboard' }],
      })
    }
    if(result2.substr(75, 20)[19]==='"' ){

      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminDashboard' }],
      })
    }

    if(result.substr(75, 20)[19]==='5' && result1.substr(75, 20)[19]==='5' && result2.substr(75, 20)[19]==='5'){
      Alert.alert("Email Not Found!!")
    }
    
    
    if(result.substr(75, 20)[19]==='6' || result1.substr(75, 20)[19]==='6' || result2.substr(75, 20)[19]==='6'){
      Alert.alert("Invalid Password!!")
    }
    
    
  }

  return (
    <View style={styles.container}>
     {/* <TouchableOpacity  style={styles.imageLayout} onPress={navigation.goBack}>
                <Image
                style={styles.image}
                source={require('../assets/BackArrow.png')}
                />
  </TouchableOpacity>*/}
      
      <View style={{ alignSelf: 'center', marginTop: 150}}>
            <Logo/>
      </View>
      
      <ScrollView>
      <KeyboardAvoidingView >
      <View style={{alignSelf: 'center'}}>
      <Header>Welcome Back</Header>
      </View>
      <TextInput
      style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
      style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}
      style={{ marginTop: 24, width: 200, marginStart: 100 }}
      >
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('DriverSignUp')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: theme.colors.surface
    
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginStart: 90
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    marginRight: 60
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
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
})