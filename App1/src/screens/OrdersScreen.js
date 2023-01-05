import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Text
  } from 'react-native';
  import TouchableComponent from '../components/TouchableListComponent';
  import app from '../../firebaseConfig'
  import {useEffect} from 'react';
  import { useState } from "react";
  import 'firebase/compat/database'
  
  
  export function OrdersScreen ({ navigation: {navigate}}) {
    
    const reference = app.database()
    
    const [orders, setOrders] = useState([])
  
    useEffect(()=>{
      reference.ref().child('orders').on('value',
        snapshot => {
          setOrders([]);    
          snapshot.forEach((child) => {

            const newObj = {
              id: child.key,
              nr: child.val().nr,
              items: child.val().items,
              status: child.val().status,
              location: child.val().location,
              customer_name: child.val().customer.name,                   
                         
            }
            setOrders(emptyArray => [...emptyArray, newObj]);  
          })
        })
     
      }, [])
  

    return (
      <SafeAreaView style= {styles.container}>
        <View style = {{flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-start'}}>
            <Text style = {styles.title}>Order nr.</Text>
            <Text style = {styles.subtitle1}>Location</Text>
            <Text style = {styles.subtitle1}>Status</Text>
        </View>
        <FlatList
          data={orders}
          renderItem={({item}) => {
            return(
              <TouchableComponent title = {item.nr}
                subtitle1 = {item.location}
                subtitle2 = {item.status}
                event =  {() => navigate('Order', item)}
                >
              </TouchableComponent>                
            );
          }}
        ></FlatList>
  
      </SafeAreaView>
    )
  }
  
  export default OrdersScreen
  
  const styles  = StyleSheet.create(
    {
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingBottom: 20,
          paddingTop: 30,
          backgroundColor: 'aliceblue'
        },
        
        title: {
          marginLeft: 30,
            fontSize: 18,
            fontWeight: '500',
            textAlign: 'center',
            color: 'darkslategrey'
            
        },
        subtitle1: {
            marginLeft: 20,
            fontSize:15,
            fontWeight: '500',
            textAlign: 'center',
            color: 'slategrey'
        },
        
    }
  )