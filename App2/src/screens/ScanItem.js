import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button, TextInput, Text, View, StyleSheet } from "react-native";
import Styles from "../../Styles";
import ButtonComponent from "../components/ButtonComponent";
import app from "../../firebaseConfig";
import { BarCodeScanner } from 'expo-barcode-scanner';
import 'firebase/compat/database'

function ScanItem({navigation: {navigate}}) {
    const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
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
    
    reference.ref().child('orders').orderByChild('nr').equalTo(nr).once('value').then(snapshot => { 
      
      alert(`ID ${snapshot.key}`)
      snapshot.forEach((child) => {
        alert(`ID ${child.key}`)
        reference.ref(`/orders/${child.key}`).update({status: "Waiting"}).then(() => {
        navigate('Start')});
    })
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
      {scanned && <ButtonComponent title={'Tap to Scan Again'} event={() => 
        setScanned(false)}
        />}
      </SafeAreaView>
  );
}
  
export default ScanItem