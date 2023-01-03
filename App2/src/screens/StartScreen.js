import {
  SafeAreaView,

  StyleSheet
} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';

import 'firebase/compat/database'


export function StartScreen ({ navigation: {navigate}}) {

  
  return (
    <SafeAreaView style= {Styles.container}>

      <ButtonComponent title = "Collect Order"
      event={()=> {navigate('ScanItem')}}/>
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