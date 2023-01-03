import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const TouchableComponent = ({nr, location, event}) => {
    return(
        <TouchableOpacity
        style ={styles.listItem}       
        onPress = {event}
        >
            <View style = {{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style = {styles.nr}>{nr}</Text>
                <Text style = {styles.location}>{location}</Text>
            </View>
            
            
        </TouchableOpacity>
        
    )
}
const styles  = StyleSheet.create(
    {
        listItem: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            height: 50,
            width: 220,
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            borderColor: 'rgba(200,200,200,0.5)',
            borderStyle: 'solid',
        },
        nr: {
            marginLeft: 10,
            fontSize: 20,
            fontWeight: '500',
            textAlign: 'center',
            color: 'darkslategrey'
            
        },
        location: {
            marginLeft: 20,
            fontSize:15,
            fontWeight: '500',
            textAlign: 'center',
            color: 'slategrey'
        },
    }
)
export default TouchableComponent;