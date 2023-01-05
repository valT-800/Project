import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button, TextInput, Text, View, StyleSheet } from "react-native";
import Styles from "../../Styles";
import CustomButton from "../components/CustomButton";
import app from "../../firebaseConfig";
import { BarCodeScanner } from 'expo-barcode-scanner';
import 'firebase/compat/database'

function ScanItem({navigation: {navigate}}) {
    const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  const getCurrentTime = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
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

    alert(`Your order ${data} will be in a minute`);

    handleSubmit(data)
  };
  const reference = app.database()

  const handleSubmit = (nr) => {
    
    reference.ref().child('orders').orderByChild('status').equalTo('Ready for delivery').orderByChild('nr').equalTo(nr).once('value').then(snapshot => { 
      if(snapshot.exists){
        snapshot.forEach((child) => {
        reference.ref(`/orders/${child.key}`).update({
          status: "Waiting",
          arrived_at: getCurrentTime()
      }).then(() => {
        navigate('Start')});
    })
      }else{
        alert(`Something went wrong your order is being prepared or it is already delivered`)
      }
      
  })  
}

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style = {Styles.container}>
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
  
export default ScanItem