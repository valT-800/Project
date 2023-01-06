import React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View, 
  Text
} from 'react-native';
import app from '../../firebaseConfig';
import CustomButton from '../components/CustomButton';
import 'firebase/compat/database'
import CustomLine from '../components/CustomLine';
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
    let year = today.getFullYear();
    let month = today.getUTCMonth();
    let date = today.getUTCDate();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ':' + minutes + ':' + seconds;
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View>
        <CustomLine label="Order nr:  " text = {nr}/>
        <CustomLine label="Items:  " text = {items}/>
        <CustomLine label="Location:  " text={location}/>
        <CustomLine label="Customer name:  " text ={customer_name}/>
      </View>      
      <CustomButton title="Delivered" event = {() => setVisibility(true)}/>
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