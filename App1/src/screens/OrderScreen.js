import React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View, 
  Text
} from 'react-native';
import app from '../../firebaseConfig';
import ButtonComponent from '../components/ButtonComponent';
import 'firebase/compat/database'
import Line from '../components/CustomLine';
import Dialog from 'react-native-dialog';



function OrderScreen({route,  navigation: {navigate}}) {
  const { id, nr, items, status, location, arrived_at, customer_name } = route.params;  
  const [visibility, setVisibility] = useState(false)

  const reference = app.database()  

  const Confirm = () => {

      return(
        <Dialog.Container visible ={visibility}>
        <Dialog.Title>Confirm</Dialog.Title>
        <Dialog.Description>
          Are you sure?
        </Dialog.Description>
        <Dialog.Button label="No" onPress={()=>{setVisibility(false)}}/>
        <Dialog.Button label="Yes" onPress={() =>{
          reference.ref('orders/'+ id).update({
            status: "Delivered",
            delivered_at: getCurrentTime()
          })
          .then(() => {
            navigate('Orders')
          })
        }} />
      </Dialog.Container>
    );     
      
  }
  const getCurrentTime = () => {
    let today = new Date();
    let date = today.getDate();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return date + " " + hours + ':' + minutes + ':' + seconds;
  }

  /*const updateOrderStatus = () => {
    return(
      reference.ref('orders/'+ id).update({
        status: "Delivered"
      })
      .then(() => {
        //removeOrderFromWaitingList()
        //navigate('Orders')
      })
    )
      

  }*/
  /*const removeOrderFromWaitingList = ()  => {
    reference.ref("orders/"+id).remove()
    .then(() => console.log('Deleted', id))
    .catch(()=> console.log('nope'))
  }*/

  return (
    <SafeAreaView style={styles.container}>
      
      <View>
        <Line label="Order nr:  " text = {nr}/>
        <Line label="Items:  " text = {items}/>
        <Line label="Location:  " text={location}/>
        <Line label="Customer name:  " text ={customer_name}/>
      </View>      
      <ButtonComponent title="Delivered" event = {() => setVisibility(true)}/>
      <Confirm/>
    </SafeAreaView>
  );
}
export default OrderScreen

const styles  = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingBottom: 40,
      paddingTop: 30,
      backgroundColor: 'aliceblue',
      alignItems: 'flex-start'
    },
      
  }
)