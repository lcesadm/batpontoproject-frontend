import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { PickerMirror } from "../components/Pickers";
import { HeaderMirrorSheet } from "../components/Header";
import { MirrorList } from "../components/FlatLists";
import { HeaderTable } from "../components/Header";
import * as hoursCardService from "../services/hoursCardService";

export default ({navigation, route}) => {
  
  const [month, setMonth] = useState();
  const [listMonth, setListMonth] = useState([]);

  const [tableList, setTableList] = useState();
  const [infosDate, setInfosDate] = useState();
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  let auxMonth;

  useEffect(() => {
    hoursCardService.findAllByUserId({id: route.params.userInfos.userId, setInfosDate});
  }, []);

  useEffect(() => {
    if (month) {
      auxMonth = months.indexOf(month.split(" ")[0]) + 1 < 10 ? "-0" + (months.indexOf(month.split(" ")[0]) + 1) : "-" + (months.indexOf(month.split(" ")[0]) + 1);
      hoursCardService.findAllByMonth({id: route.params.userInfos.userId, start: month.split(" ")[1] + auxMonth + "-01", end: month.split(" ")[1] + auxMonth + "-31", setTableList});
    }
  }, [month]);

  useEffect(() => {
    if (infosDate) {
      let aux = [];
      let monthNum = infosDate[0].slice(6,7) - 1;
      infosDate.forEach(date => {
        if (date.slice(6,7) > monthNum) {
          aux.push(months[date.slice(6,7) - 1] + " " + date.split("-")[0]);
          monthNum = date.slice(6,7);
        }
      });
      setListMonth(aux);
    }
  }, [infosDate]);

  return (
    <View style={styles.container}>
      <HeaderMirrorSheet
        navigation={navigation}
      />
      <View style={styles.containerPicker}>
        <PickerMirror
          data={month}
          setData={setMonth}
          list={listMonth}
          dir={require("../img/icons/calendar.png")}
        />
      </View>
      <View style={styles.containerFlat}>
        <MirrorList
          header={<HeaderTable />}
          data={tableList}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex:1,
  },

  containerPicker: {
    marginTop: 20,
    alignItems: "center",
    justifyContent:"center",
  },

  containerFlat: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
})
