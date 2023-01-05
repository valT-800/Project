import { SafeAreaView, StyleSheet } from "react-native";
import ButtonComponent from "../components/ButtonComponent";

export function HomeScreen ({ navigation: {navigate}}) {

    return(
        <SafeAreaView style= {styles.container}>
            <ButtonComponent title="All orders" event = {() => navigate('Orders')}/>
            <ButtonComponent title="Waiting orders" event = {() => navigate('WaitingOrders')}/>
  
      </SafeAreaView>
    )
}
export default HomeScreen

const styles  = StyleSheet.create(
    {
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 20,
          backgroundColor: 'aliceblue'
        },
        
    }
  )