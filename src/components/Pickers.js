import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const PickerForm = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.label}</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={props.data}
          onValueChange={(itemValue) => props.setData(itemValue)}
        >
          {
            props.list.map(value => {
              return <Picker.Item key={value} label={value} value={value}/>
            })
          }
        </Picker>
      </View>
    </View>
  )
}

export const PickerMirror = props => {
  return (
    <View style={styles.containerMirror}>
      <View style={styles.pickerMirror}>
        <Picker
          selectedValue={props.data}
          onValueChange={(itemValue) => props.setData(itemValue)}
          style={styles.pickerText}
        >
          {
            props.list.map(value => {
              return <Picker.Item key={value} label={value} value={value}/>
            })
          }
        </Picker>
      </View>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={props.dir}
          tintColor="#FFF"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    alignItems: "center"
  },

  containerMirror: {
    height: 100,
    alignItems: "center",
    flexDirection: "row"
  },

  text: {
    marginTop: 20,
    width: 300,
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold"
  },

  picker: {
    marginTop: 5,
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFF"
  },

  pickerMirror: {
    width: 400,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3A9739"
  },

  pickerText: {
    marginLeft: 140,
    transform: [{scaleX: 2}, {scaleY: 2}],
    color: "#FFF"
  },

  image: {
    width: 60,
    height: 60
  },

  imageView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 300,
    backgroundColor: "#3A9739",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  }
})
