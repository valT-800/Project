import { SafeAreaView, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

export function HomeScreen ({ navigation: {navigate}}) {

    return(
        <SafeAreaView style= {styles.container}>
            <CustomButton title="All orders" event = {() => navigate('Orders')}/>
            <CustomButton title="Waiting orders" event = {() => navigate('WaitingOrders')}/>
  
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