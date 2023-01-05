import React from "react";
import { Text, Button, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
const CustomButton = ({title, event}) => {
    return(
        <TouchableOpacity
        style ={styles.button}
        title = {title}
        onPress = {event}
        >
            <Text style = {styles.buttonLabel}>{title}</Text>
        </TouchableOpacity>
        
    )
}
const styles  = StyleSheet.create(
    {
        button: {
            alignSelf: 'center',
            marginTop: 10,
            paddingVertical: 12,
            paddingHorizontal: 22,
            backgroundColor: 'turquoise',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: 'whitesmoke',
            borderStyle: 'solid'
        },
        buttonLabel: {
            fontSize: 20,
            fontWeight: '500',
            textAlign: 'center',
            color: 'darkslategrey'
        }
    }
)
export default CustomButton;