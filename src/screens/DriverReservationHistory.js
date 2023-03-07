import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { 
    View, 
    Text,
    TextInput, 
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    RefreshControl
    
} from 'react-native';
import * as Animatable from'react-native-animatable';
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { theme } from '../core/theme';
import { resolve } from 'path';


export default function DriverReservations ({navigation}){

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

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh =  React.useCallback( async ()  => {
        setRefreshing(true);
        const response = await fetch ('http://192.168.42.157:3001/DriverAllReservations');
          const result = await response.json();
          //console.log(result)
          setReservations(result)
        
        wait(2000).then(() => setRefreshing(false));
    }, []);

    var data = []

    for(let i=0; i< reservations.length; i++ ){
        data.push(Object.values(reservations[i]))
    }
    console.log(data)

   
    var initList = []
    var ResList = []

    for(let i=0; i<data.length; i++){
        initList.push([data[i][0], data[i][1].substr(0, 10), data[i][2].substr(0, 5), data[i][3], data[i][4], data[i][5]])
    }
    //console.log(initList)
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

        return(
            <View key={key[4]} style={styles.styleButtons}>
            <View 
            style={styles.data}>
                <Text style={styles.dataText}> {key[1]} {key[2]} </Text>
                <Text style={styles.dataText}> {key[0]}</Text>
                </View>
        <View style={styles.styleButtons2}>

            
            { key[3] === 1 ? (
                <TouchableOpacity></TouchableOpacity>
            ): (
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate("QrMapScreenM1", { 
                    itemId: 3, date: key[1], time: key[2], mat: key[0], resId: key[4], cin: key[5]})}
                    style={{marginEnd:10}}>
                <MaterialIcons name="gps-fixed" size={25} color={theme.colors.tertiary}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ModifyReservation', {
                    itemId: 1,
                    index: key[4]
                })} >
                <Feather
                    name="edit"
                    color={theme.colors.primary}
                    size={25}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{onDeletePressed()}} >
                <Feather
                    name="trash-2"
                    color={theme.colors.error}
                    size={25}
                    />
                </TouchableOpacity>
                </View>
            )}
                
                
        </View>
                
        </View>

        )
    }
        
    )    
    

    return (
      <View style={styles.container}>
        <TouchableOpacity
            style={{ alignItems: "flex-start", marginTop: 35, marginStart: 30 }}
            onPress={navigation.openDrawer}
          >
            <FontAwesome name="bars" size={24} color={theme.colors.surface} />
          </TouchableOpacity>
        <View style={styles.header}>
        
            <Text style={styles.text_header}>My Reservations </Text>
        </View>

        <Animatable.View  
        style={styles.footer}
        animation="fadeInUpBig"
        >
           <ScrollView style={styles.scrollcontainer} refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
            
                {ResList}
                
           </ScrollView>
        {/*
            <TouchableOpacity onPress={addData.bind(state)} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        <View>
            <TextInput
                style={styles.textInput}
                onChangeText={(dataText)=>setState({dataArray:[], dataText: dataText})}
                value={state.dataText}
                placeholder='test Reservation'
                placeholderTextColor='grey'
                underlineColorAndroid='transparent'
                >

            </TextInput>
        </View>*/}
            </Animatable.View>
        </View>
    )
    
}
    







const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: theme.colors.primary
  },
  container1: {
    borderRadius: 30,
    backgroundColor: '#fff'
  },
  header: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      //paddingVertical:150,
      paddingHorizontal: 10
  },
  
  title: {
      color: '#0000A0',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  
  

text_footer: {
    color: '#05375a',
    fontSize: 15,
    paddingVertical:20,
    
},
text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
},
  
  textInput: {
    alignSelf:'stretch',
    color: 'grey',
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderTopWidth:2,
    borderTopColor:'#ededed',
    
},

scrollcontainer:{
    flex: 1,
    marginBottom: 70,
    borderRadius:30,
    marginTop:20
},
data:{
    position:'relative',
    padding:20,
    paddingRight: 100,
    borderBottomWidth:2,
    borderBottomColor:'#ededed',
},
dataText:{
    paddingLeft:20,
    borderLeftWidth:10,
    borderLeftColor: theme.colors.error,
},
dataDelete:{
    position:'absolute',
    justifyContent:'center',
    alignItems :'center',
    backgroundColor: theme.colors.error,
    padding:10,
    top: 10,
    bottom: 10,
    right:10 ,
},
dataDeleteText:{
    color: 'white'
},
addButton:{
    position:'absolute',
    zIndex:11,
    right:20,
    bottom:90,
    backgroundColor: theme.colors.error,
    width:30,
    height:30,
    borderRadius:50,
    alignItems : 'center',
    justifyContent:'center',
    paddingBottom: 3,
    elevation:2,

},
addButtonText:{
    color:'white',
    fontSize:24,
},
styleButtons:{
    flex:1,
    flexDirection:'row',
   
    
},
styleButtons2:{
    flex:1,
    flexDirection:'row',
    alignItems :'center',
    backgroundColor:'white',
    justifyContent:'space-around',
    borderRadius: 30,
    left:10 ,
    width:10,
    padding:10,
    
    
   
    
}

});
