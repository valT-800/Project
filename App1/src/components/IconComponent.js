import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableHighlight, View, TouchableOpacity } from "react-native";


const IconComponent = ({name, event}) => {
    return(
        
        <TouchableHighlight   
        onPress = {event}>
            <AntDesign
            name = {name}
            size = {25}/>
        </TouchableHighlight>
        
    )
    
    
};
export default IconComponent;
const styles  = StyleSheet.create(
    {
        icon: {
            size: 25,
            color: 'black',
            alignSelf: 'flex-end'
        },
        container: {
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            marginBottom: 10,
            marginTop: 10
          },
    }
)
