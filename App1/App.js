import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Styles from './Styles';
import OrderScreen from './src/screens/OrderScreen';
import OrdersScreen from './src/screens/OrdersScreen';


const Stack = createNativeStackNavigator();

function Navigation(){
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={OrdersScreen}>
          <Stack.Screen name = "Orders" component={OrdersScreen} options = {{headerStyle: Styles.header, title: ''}}/>
          <Stack.Screen name = "Order" component={OrderScreen} options = {{headerStyle: Styles.header, title: ''}}/>   
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