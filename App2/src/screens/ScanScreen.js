import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button, TextInput, Text, View, StyleSheet } from "react-native";
import Styles from "../../Styles";
import CustomButton from "../components/CustomButton";
import app from "../../firebaseConfig";
import { BarCodeScanner } from 'expo-barcode-scanner';
import 'firebase/compat/database'

function ScanScreen({navigation: {navigate}}) {
    const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState("")
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    checkOrder(data)
    if(id!=""){
      handleSubmit(data)
    }
    
  };
  const reference = app.database()

  const checkOrder = (nr) => {
    reference.ref().child('orders').orderByChild('status').equalTo('Delivered').once('value')
    .then(snapshot => { 
      snapshot.forEach((child) =>{
        if(child.val().nr == nr){
          alert(`Your order was already delivered. If you have father questions, please contact our workers`)
          navigate('Start')
        }
      })
    })

    reference.ref().child('orders').orderByChild('status').equalTo('Waiting').once('value')
    .then(snapshot => { 
      snapshot.forEach((child) =>{
        if(child.val().nr == nr){
          alert(`Your order is on the way. If you have father questions, please contact our workers`)
          navigate('Start')
        }
      })
    })
    reference.ref().child('orders').orderByChild('status').equalTo('Ready for delivery').once('value')
      .then(snapshot => { 
        snapshot.forEach((child) =>{
          if(child.val().nr == nr){  
            setId(child.val().id)
          } 
        })     
    })

  }

  const handleSubmit = (data) => {
    
  reference.ref().child('orders').child(id).update({
    status: "Waiting",
    arrived_at: getCurrentTime()
    }).then(() => {
      alert(`Your order ${data} will be in a minute`)
      navigate('Start') }) 
  
  
}

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style = {Styles.container}>
      <Text>Please scan your order qr-code</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <CustomButton title={'Tap to Scan Again'} event={() => 
        setScanned(false)}
        />}
      </SafeAreaView>
  );
}
  
export default ScanScreen