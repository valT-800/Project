import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

const CustomButton = ({title, onPress, disabled}) => (
  <View style={styles.addButtonContainer}>
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={[styles.addButton, {backgroundColor: disabled === false ? 'turquoise' : 'darkturquoise'}]}>
        <Text style={styles.addButtonText}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  addButtonText: {
    fontSize: 22,
    lineHeight: 22,
  },
  addButton: {
    width: 120,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  addButtonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
});

export default CustomButton;