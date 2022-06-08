import React from "react";
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image } from "react-native";

export const HeaderHome = props => {
  return (
    <View>
      <StatusBar 
        backgroundColor="#3A9739"
        barStyle="default"
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonHeader}
          onPress={() => props.function()}
        >
          <Image
            style={styles.image}
            source={require("../img/icons/logout.png")}
            tintColor="#FFF"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{props.name}</Text>
      </View>
    </View>
  )
}

export const HeaderMirrorSheet = props => {
  return (
    <View>
      <StatusBar 
        backgroundColor="#3A9739"
        barStyle="default"
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonHeader}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            style={styles.image}
            source={require("../img/icons/previous.png")}
            tintColor="#FFF"
          />
        </TouchableOpacity>
        <Text style={styles.headerMirrorText}>FOLHA ESPELHO</Text>
      </View>
    </View>
  )
}

export const HeaderTable = props => {
  return (
    <View style={styles.headerTable}>
      <Text style={styles.tableText}>Dia</Text>
      <Text style={styles.tableText}>Entrada</Text>
      <Text style={styles.tableText}>Saída</Text>
      <Text style={styles.tableText}>Total</Text>
      <Text style={styles.tableText}>Extra</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  image: {
    marginLeft: 10,
    marginTop: 8,
    height: 50,
    width: 50
  },

  buttonHeader: {
    width: 70,
    height: 70,
    marginRight: 50,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A9739",
  },

  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF"
  },

  headerMirrorText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF"
  },

  headerTable: {
    width: 400,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3A9739"
  },

  tableText: {
    margin: 5,
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF"
  }
})
