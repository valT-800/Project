import {
  SafeAreaView,

  StyleSheet
} from 'react-native';
import CustomButton from '../components/CustomButton';

import 'firebase/compat/database'


export function StartScreen ({ navigation: {navigate}}) {

  
  return (
    <SafeAreaView style= {Styles.container}>

      <CustomButton title = "Collect Order"
      event={()=> {navigate('Scan')}}/>
    </SafeAreaView>
  )
}

export default StartScreen

const Styles  = StyleSheet.create(
  {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 20,
        paddingTop: 30,
        backgroundColor: 'aliceblue'
      }
  }
  )