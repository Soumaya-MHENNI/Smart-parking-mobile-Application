import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert, Modal} from 'react-native'
import { createDrawerNavigator} from 'react-navigation-drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { createAppContainer } from 'react-navigation'
import { Actions } from 'react-native-router-flux'
import { SideBar } from '../components/SideBar'
import { colors } from 'react-native-elements'
import { theme } from '../core/theme'
import { FontAwesome} from '@expo/vector-icons'
import { Title, IconButton } from 'react-native-paper'
import { Button } from 'native-base'

export default function MarkerPopUp ({address, freeSpaces, visible, close, navigation}) {
    
    
    return(
        <View>
            <Modal animationType='fade' transparent={true} visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{flexDirection: 'row'}}>
                        <Title style={{color: theme.colors.primary, marginTop: 15}}>Description</Title>
                        <IconButton icon="close" color={theme.colors.primary} style={{ marginStart: 160}} size={20} onPress={close} />
                        </View>
                        
                        <View style={{ marginStart: 20, flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>Free Spaces: </Text>
                        <Text>{freeSpaces}</Text>
                        </View>

                        <View style={{ marginStart: 20, flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>Address: </Text>
                        <Text>{address}</Text>
                        </View>
                        <Button style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 10, marginStart: 80, marginTop: 15}} onPress={navigation} >
                            <Text style={{ fontWeight: 'bold', color: theme.colors.surface}}>Make Reservation</Text>
                        </Button>

                    </View>
                </View>   
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalView:{
        width: '80%',
        margin: 10,
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        paddingStart: 15,
        paddingBottom: 15,
        shadowColor: theme.colors.error,
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.05,
        elevation: 5
    },
    text:{
        textAlign: 'justify',
        fontSize: 15,
        marginTop: 15
    }
})