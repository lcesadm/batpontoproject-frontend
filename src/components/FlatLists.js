import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export const MirrorList = props => {
  return (
    <View>
      <FlatList
        ListHeaderComponent={props.header}
        stickyHeaderIndices={[0]}
        data={props.data}
        keyExtractor={item => item.hoursCardId}
        renderItem={({item}) => {
          return (
            <View style={item.hoursCardId % 2 == 0 ? styles.headerOne : styles.headerTwo}>
              <Text style={item.extraTime > 0 ? styles.extraText : styles.headerText}>{item.actualDate.split("-")[2]}</Text>
              <Text style={item.extraTime > 0 ? styles.extraText : styles.headerText}>{item.inputTime.slice(0,5)}</Text>
              <Text style={item.extraTime > 0 ? styles.extraText : styles.headerText}>  {item.outputTime.includes(" ") ? item.outputTime.split(" ")[item.outputTime.split(" ").length - 1].slice(0,5) : item.outputTime.slice(0,5)}</Text>
              <Text style={item.extraTime > 0 ? styles.extraText : styles.headerText}>  {item.workedTime}</Text>
              <Text style={item.extraTime > 0 ? styles.extraText : styles.headerText}>    {item.extraTime}    </Text>
            </View>
          )
        }
      }
      />
    </View>
  )
}

const styles = StyleSheet.create({ 

  headerOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#AED4AE"
  },

  headerTwo: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#D4E8D3"
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color:"#FFF"
  },

  extraText: {
    fontSize: 30,
    fontWeight: "bold",
    color:"#FF0000"
  }
})
