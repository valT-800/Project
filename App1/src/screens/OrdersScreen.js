import {
  SafeAreaView,
  FlatList,
  StyleSheet
} from 'react-native';
import TouchableComponent from '../components/TouchableListComponent';
import app from '../../firebaseConfig'
import {useEffect} from 'react';
import { useState } from "react";
import 'firebase/compat/database'


export function OrdersScreen ({ navigation: {navigate}}) {
  
  const reference = app.database()
  
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    reference.ref().child('orders').orderByChild('status').equalTo('Ready for delivery').on('value',
      snapshot => {
        setOrders([]);    
        snapshot.forEach((child) => {
          const newObj = {
            id: child.key,
            nr: child.val().nr,
            items: child.val().items,
            status: child.val().status,
            location: child.val().location,                    
                       
          }
          setOrders(emptyArray => [...emptyArray, newObj]);  
        })
      })    
   
    }, [])

  return (
    <SafeAreaView style= {styles.container}>

      <FlatList
        data={orders}
        renderItem={({item}) => {
          return(
            <TouchableComponent nr = {item.nr}
              location = {item.location}
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
      
  }
)