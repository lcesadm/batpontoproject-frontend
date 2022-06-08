import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export const WhiteButton = props => {
  return (
    <View>
      <TouchableOpacity
        style={styles.whiteButton}
        onPress={() => props.navigation.navigate(props.route)}
      >
        <Text style={styles.whiteText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export const SubmitButton = props => {
  return (
    <View>
      <TouchableOpacity
        style={styles.whiteButton}
        onPress={() => props.function()}
      >
        <Text style={styles.whiteText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export const GreenButton = props => {
  return (
    <View>
      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => props.function()}
      >
        <Text style={styles.whiteText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export const MirrorButton = props => {
  return (
    <View style={styles.containerMirror}>
      <TouchableOpacity
        style={styles.mirrorButton}
        onPress={() => props.navigation.navigate("MirrorSheet", {userInfos: props.userInfos})}
      >
        <Image 
          style={styles.imageButton}
          source={props.dir}
          tintColor="#FFF"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({ 

  containerMirror: {
    bottom: 50,
    right: 20,
    alignSelf: "flex-end",
    position: "absolute"
  },

  whiteButton: {
    width: 120,
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFF"
  },
  
  greenButton: {
    width: 140,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A9739"
  },
  
  mirrorButton: {
    borderRadius: 100,
    width: 120,
    height: 120,
    backgroundColor: "#3A9739",
    alignItems: "center",
    justifyContent: "center"
  },

  whiteText: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold"
  },
  
  imageButton: {
    width: 80,
    height: 80
  }
})
