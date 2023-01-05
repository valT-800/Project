import { View, StyleSheet, Text } from "react-native"

export default CustomLine = ({label, text}) =>{
    return(
        <View style = {styles.container}>
            <Text style = {styles.label}>{label}</Text>
            <Text style = {styles.text}>{text}</Text>
        </View>
        

    )
}
const styles = StyleSheet.create(
{
    container: {
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
        padding: 30,

        flexDirection: 'row'
    },
    label: {
        fontSize: 15,
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
    }  
}
)