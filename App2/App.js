import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Styles from './Styles';
import ScanItem from './src/screens/ScanItem';
import StartScreen from './src/screens/StartScreen';


const Stack = createNativeStackNavigator();

function Navigation(){
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={StartScreen}>
          <Stack.Screen name = "Start" component={StartScreen} options = {{headerStyle: Styles.header, title: ''}}/>
          <Stack.Screen name = 'ScanItem' component={ScanItem} options = {{headerStyle: Styles.header, title: ''}}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}


function App(){
  return(
    <Navigation/>
    
  )
}

export default App;