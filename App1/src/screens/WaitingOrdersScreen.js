import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View, 
  Text
} from 'react-native';
import CustomListComponent from '../components/CustomListComponent';
import app from '../../firebaseConfig'
import {useEffect} from 'react';
import { useState } from "react";
import 'firebase/compat/database'
import moment from 'moment/moment';
import { format } from 'date-fns';


export function WaitingOrdersScreen ({ navigation: {navigate}}) {
  
  const reference = app.database()
  
  const [orders, setOrders] = useState([]);
  const[time, setTime] = useState(null)

  useEffect(()=>{
    reference.ref().child('orders').orderByChild('status').equalTo('Waiting').on('value',
      snapshot => {
        setOrders([]);    
        snapshot.forEach((child) => {
          const newObj = {
            id: child.key,
            nr: child.val().nr,
            items: child.val().items,
            status: child.val().status,
            location: child.val().location, 
            arrived_at: child.val().arrived_at,
            customer_name: child.val().customer.name,                   
                       
          }
          setOrders(emptyArray => [...emptyArray, newObj]);  
        })
      })
      
      setTime(getCurrentTime())
   
    }, [])

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

   const formatTime = (time) => {
    format(time, 'HH:mma');
    //moment.utc('2000-01-01T15:40:00.000Z', "YYYY-MM-DDTHH:mm:ss Z").format('HH:mma');
    //It will print "15:40pm"
   }
  return (
    <SafeAreaView style= {styles.container}>
      <View style = {{flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-start'}}>
            <Text style = {styles.title}>Order nr.</Text>
            <Text style = {styles.subtitle1}>Location</Text>
            <Text style = {styles.subtitle1}>Time</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={({item}) => {
          return(
            <CustomListComponent title = {item.nr}
              subtitle1 = {item.location}
              subtitle2 = {item.arrived_at}
              event =  {() => navigate('Order', item)}
              >
            </CustomListComponent>                
          );
        }}
      ></FlatList>

    </SafeAreaView>
  )
}

export default WaitingOrdersScreen

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
          marginLeft: 30,
          fontSize:15,
          fontWeight: '500',
          textAlign: 'center',
          color: 'slategrey'
      },
      
  }
)