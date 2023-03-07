import React, { useState } from 'react'

import Logo from '../components/Logo'
import { theme } from '../core/theme'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import InteractiveList from '../components/InteractiveList';
import {getStatusBarHeight} from 'react-native-status-bar-height'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { List, TextInput } from 'react-native-paper';
import axios from 'axios';


export default function DriverSignUp({navigation}) {
    const [Firstname, setFirstName] = useState({ value: '', error: '' })
    const [Lastname, setLastName] = useState({ value: '', error: '' })
    const [CIN, setCIN] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [phone, setPhone] = useState({ value: '', error: '' })
    {/*const [licencePlate, setLicencePlate] = useState({ value: '', error: '' })
    const [size, setSize] = useState({ value: '', error: '' })
    const [colour, setColour] = useState({ value: '', error: '' })
    const [brand, setBrand] = useState({ value: '', error: '' })
    const [rib, setRIB] = useState({ value: '', error: '' })
    const [type, setType] = useState({ value: '', error: '' })
    const [card, setCard] = useState({ value: '', error: '' })
const [bank, setBank] = useState({ value: '', error: '' })*/}
   
      const onDriverSignUpPressed = () => {
        const FirstnameError = nameValidator(Firstname.value)
        const LastnameError = nameValidator(Lastname.value)
        const CINError = nameValidator(CIN.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        const phoneError = nameValidator(phone.value)
        {/*const licencePlateError = nameValidator(licencePlate.value)
        const sizeError = nameValidator(size.value)
        const colourError = nameValidator(colour.value)
        const brandError = nameValidator(brand.value)
        const ribError = nameValidator(rib.value)
        const typeError = nameValidator(type.value)
        const cardError = nameValidator(card.value)
        const bankError = nameValidator(bank.value)*/}

        if ( emailError || passwordError || phoneError || CINError || LastnameError || FirstnameError) { //bankError || cardError || typeError || ribError || brandError || colourError || sizeError || licencePlateError ||
            setFirstName({ ...Firstname, error: FirstnameError })
            setLastName({...Lastname, error: LastnameError})
            setCIN({...CIN, error: CINError})
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setPhone({ ...phone, error: phoneError })
            {/*setLicencePlate({...licencePlate, error: licencePlateError})
            setSize({...size, error: sizeError})
            setColour({...colour, error: colourError})
            setBrand({...brand, error: brandError})
            setRIB({...rib, error: ribError})
            setType({...type, error: typeError})
            setCard({...card, error: cardError})
        setBank({...bank, error: bankError})*/}
            return
        }

        fetch('http://192.168.42.157:3001/DriverPost', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cin: CIN.value,
            firstname: Firstname.value,
            lastname: Lastname.value,
            login: email.value,
            password: password.value,
            phone: phone.value,
            ptFidelity: '0',
          })
          });


        Alert.alert("Success",
          "Your registration was carried successfully, press ok to login.",
          [{
            text: 'OK', onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });
            }
          }])
      }
      

    
    return(
        
        <View style={styles.container} behavior="padding">
            
            <TouchableOpacity  style={styles.imageLayout} onPress={navigation.goBack}>
                <Image
                style={styles.image}
                source={require('../assets/BackArrow.png')}
                />
            </TouchableOpacity>
            
            <View style={{ alignSelf: 'center', marginTop: 120}}>
            <Logo/>
            </View>
            
            <ScrollView style={styles.scrollView}>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null}>
            {/*
            <InteractiveList text={'Personal Information'} press={() => setExpanded(!expanded)}/>
            <InteractiveList text={'Vehicle Features'}/>
            <InteractiveList text={'Bank Account'}/> */}
            {/*<List.Accordion style={{ alignItems: 'center'}}
            title="Personal Information"
          left={props => <List.Icon {...props} icon="account" color={ theme.colors.primary} style={styles.link}/>}>*/}
            <TextInput 
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            label="First Name"
            returnKeyType="next"
            mode="outlined"
            autoCorrect={false}
            value={Firstname.value}
            onChangeText={(text) => setFirstName({ value: text, error: '' })}
            error={!!Firstname.error}
            errorText={Firstname.error}
            />
            
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            label="Last Name"
            returnKeyType="next"
            mode="outlined"
            value={Lastname.value}
            onChangeText={(text) => setLastName({ value: text, error: '' })}
            error={!!Lastname.error}
            errorText={Lastname.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            mode='outlined'
            label="CIN"
            returnKeyType="next"
            value={CIN.value}
            onChangeText={(text) => setCIN({ value: text, error: '' })}
            error={!!CIN.error}
            errorText={CIN.error}
            />
            <TextInput 
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            label="Phone Number"
            returnKeyType="next"
            mode="outlined"
            autoCorrect={false}
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60, marginLeft: 60}}
            mode='outlined'
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
            mode='outlined'
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
            />
           {/* </List.Accordion>*/}
            
            
            
            {/*<List.Accordion style={{ alignItems: 'center'}}
            title="Vehicle Features"
            left={props => <List.Icon {...props} icon="car" color={ theme.colors.primary} style={styles.link}/>}>
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60}}
            mode='outlined'
            label="Licence Plate"
            returnKeyType="next"
            value={licencePlate.value}
            onChangeText={(text) => setLicencePlate({ value: text, error: '' })}
            error={!!licencePlate.error}
            errorText={licencePlate.error}
            />

            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60}}
            mode='outlined'
            label="Size"
            returnKeyType="next"
            value={size.value}
            onChangeText={(text) => setSize({ value: text, error: '' })}
            error={!!size.error}
            errorText={size.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60}}
            mode='outlined'
            label="Color"
            returnKeyType="next"
            value={colour.value}
            onChangeText={(text) => setColour({ value: text, error: '' })}
            error={!!colour.error}
            errorText={colour.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60}}
            mode='outlined'
            label="Brand"
            returnKeyType="next"
            value={brand.value}
            onChangeText={(text) => setBrand({ value: text, error: '' })}
            error={!!brand.error}
            errorText={brand.error}
            />
          </List.Accordion>*/}
          {/*
            <List.Accordion style={{ alignItems: 'center'}}
            title="Bank Account"
            left={props => <List.Icon {...props} icon="bank" color={ theme.colors.primary} style={styles.link}/>}>
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60}}
            mode='outlined'
            label="RIB"
            returnKeyType="next"
            value={rib.value}
            onChangeText={(text) => setRIB({ value: text, error: '' })}
            error={!!rib.error}
            errorText={rib.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60}}
            mode='outlined'
            label="Account Type"
            returnKeyType="next"
            value={type.value}
            onChangeText={(text) => setType({ value: text, error: '' })}
            error={!!type.error}
            errorText={type.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60}}
            mode='outlined'
            label="Credit Card Number"
            returnKeyType="next"
            value={card.value}
            onChangeText={(text) => setCard({ value: text, error: '' })}
            error={!!card.error}
            errorText={card.error}
            />
            <TextInput
            style={{backgroundColor: theme.colors.surface, marginRight: 60}}
            mode='outlined'
            label="Bank"
            returnKeyType="done"
            value={bank.value}
            onChangeText={(text) => setBank({ value: text, error: '' })}
            error={!!bank.error}
            errorText={bank.error}
            />
            </List.Accordion>
          */}
            <Button
          mode="contained"
          onPress={onDriverSignUpPressed}
          style={{ marginTop: 24, width: 200, marginStart: 100 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
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