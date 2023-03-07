import React, {useState, useEffect} from 'react'
import { theme, darkTheme } from '../core/theme'
import { StyleSheet, View} from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import { EventRegister } from 'react-native-event-listeners'
import { useSelector, useDispatch } from 'react-redux'
import { LinearGradient } from "expo-linear-gradient";
import { Provider } from 'react-native-paper';


export default function DrawerContent(props){


    const [ darkTheme, setDarkTheme ] = useState(false)
    const toggleTheme = () => {
        setDarkTheme(!darkTheme)
    }

    const [ personalInfo, setPersonalInfo ] = useState('')
    useEffect(() => {
        async function fetchData() {
        const response = await fetch ('http://192.168.42.157:3001/DriverProfilePersonalInfo');
        const result = await response.json();
        //console.log(result)
        setPersonalInfo(result)
        }
        fetchData();
    },[]);

    var data = []
    for(let i=0; i< personalInfo.length; i++ ){
        data.push(Object.values(personalInfo[i]))
    }
    
    for(let i=0; i<data.length; i++){
        var firstname = data[i][0]
        var lastname = data[i][1]
        var cin = data[i][2]
        var email = data[i][3]
        var initials = data[i][0][0].concat(data[i][1][0])
    }
    
    
    return(
       
        <View style={{flex: 1}} >
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{alignItems: 'center', backgroundColor: theme.colors.surface , borderRadius: 20}}>
                            <LinearGradient
                            style={{height: 50, width: 50, borderRadius: 30, alignSelf: 'center'}}
                            colors={["#00FFFF", "#37B6FF", "#3891c0", "#5C7EE6"]}
                            >
                            
                            <Text style={{ position: 'absolute', marginTop: 12, alignSelf: 'center', fontWeight: 'bold', color: theme.colors.surface, fontSize: 17}}>{initials}</Text>
                            </LinearGradient>

                            <View style={{alignItems: 'center'}}>
                                <Title style={styles.title}>{firstname} {lastname}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>

                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem icon={({size}) => (
                        <FontAwesome name="home" size={size} color={theme.colors.primary} />
                    )} label="Home" onPress={() => {props.navigation.navigate('DriverHome')}} style={{marginStart:13}}/>
                    <DrawerItem icon={({size}) => (
                        <FontAwesome name="user" size={size} color={theme.colors.primary} />
                    )} label="Profile" onPress={() => {props.navigation.navigate('DriverProfile')}} style={{marginStart: 16}}/>
                    <DrawerItem icon={({size}) => (
                        <MaterialIcons name="book-online" size={size} color={theme.colors.primary} />
                    )} label="Reservations" onPress={() => {props.navigation.navigate('DriverReservations')}} style={{marginStart: 12}}/>
                    {/*<DrawerItem icon={({size}) => (
                        <MaterialIcons name="loyalty" size={size} color={theme.colors.primary} />
                    )} label="Loyalty Points" onPress={() => {props.navigation.navigate('FidelityPts')}} style={{marginStart: 16}}/>*/}
                    <DrawerItem icon={({size}) => (
                        <MaterialIcons name="payment" size={size} color={theme.colors.primary} />
                    )} label="Payments" onPress={() => {props.navigation.navigate('DriverPaymentHistory')}} style={{marginStart:10}}/>
                    {/*<DrawerItem icon={({size}) => (
                        <FontAwesome name="gear" size={size} color={theme.colors.primary} />
                    )} label="Settings" onPress={() => {props.navigation.navigate('DriverSettings')}} style={{marginStart: 13}}/>*/}
                    
                    <DrawerItem icon={({size}) => (
                        <MaterialIcons name="support-agent" size={size} color={theme.colors.primary} />
                    )} label="Support" onPress={() => {props.navigation.navigate('DriverSupport')}}/>
                    <DrawerItem icon={({size}) => (
                        <MaterialIcons name="description" size={size} color={theme.colors.primary} />
                    )} label="About" onPress={() => {props.navigation.navigate('About')}} style={{marginStart: 13}}/>
                    </Drawer.Section>
                    {/*<Drawer.Section title="Preferences">
                        
                            <TouchableRipple onPress={() => {toggleTheme()}} >
                                    <View style={styles.preference}>
                                        <Text>Dark Theme</Text>
                                        <View pointerEvents="none">
                                            <Switch value={darkTheme} onValueChange={(val) => {setDarkTheme(val)
                                            EventRegister.emit('changeToDark', val)}}
                                            color={theme.colors.primary}/>
                                        </View>
                                    </View>
                               </TouchableRipple>
                       
                                            </Drawer.Section>*/}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem icon={({size}) => (
                    <FontAwesome name="sign-out" size={size} color={theme.colors.primary} />
                )} label="Sign Out" onPress={() => {props.navigation.navigate('LoginScreenNoGoBack')}}/>
            </Drawer.Section>
        </View>
        
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      marginTop: 30
    },
    userInfoSection: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        
        
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });