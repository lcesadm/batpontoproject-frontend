import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.label}</Text>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          autoFocus={true}
          keyboardType={props.type}
          secureTextEntry={props.secure}
          value={props.data}
          onChangeText={data => props.setData(data)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },

  text: {
    marginTop: 20,
    width: 300,
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold"
  },

  input: {
    marginTop: 5,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#FFF"
  }
})
