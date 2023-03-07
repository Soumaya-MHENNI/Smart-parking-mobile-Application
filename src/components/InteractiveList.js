import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { theme } from '../core/theme';
import { AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import Button from '../components/Button'


export default function InteractiveList({...props}){

    return(
        <TouchableOpacity style={styles.item} onPress={props.press}>

            <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <View>
                <Text style={styles.text}> {props.text}</Text>
            </View>
            <View >
            <AntDesign name="rightcircleo" size={24} color={theme.colors.primary} style={styles.RightItem}/>
            </View>
            </View>
            </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    item:{
        backgroundColor: theme.colors.surface,
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 24,
        justifyContent: 'space-between'
        
    },
    text: {
        fontSize: 16,

    }
  })