import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Image, Alert, StyleSheet } from "react-native";

import { HeaderHome } from "../components/Header";
import { GreenButton, MirrorButton } from "../components/Buttons";
import * as hoursCardService from "../services/hoursCardService";
import * as brandsService from "../services/brandsService";

export default ({navigation, route}) => {

  const [timer, setTimer] = useState("Carregando");
  const [hoursCardId, setHoursCardId] = useState();
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [workedTime, setWorkedTime] = useState();
  const [extraTime, setExtraTime] = useState();
  const [finished, setFinished] = useState();
  const [counter, setCounter] = useState();

  const [workBrandId, setWorkBrandId] = useState();
  const [timeInfos, setTimeInfos] = useState();
  const [mark, setMark] = useState();
  const loginDate = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      setTimer(hours + ":" + minutes  + ":" + seconds);
      if (date.getHours == 0 && !finished) {
        input ? null : setInput("00:00:00");
        output ? null : setOutput("00:00:00");
        workedTime ? null : setWorkedTime(0);
        extraTime ? null : setExtraTime(0);
        setFinished(true);
        Alert.alert("Finalizando o dia", "Infelizmente finalizamos o seu dia, reinicia o app para marcar o dia seguinte.");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    brandsService.findTimeById({setWorkBrandId, setMark, brandId: route.params.userInfos.brandId});
    hoursCardService.findByDate({id: route.params.userInfos.userId, date: loginDate.toISOString().split("T")[0], setHoursCardId, setInput, setOutput, setWorkedTime, setExtraTime, setFinished, setCounter, createValues});
  }, []);

  useEffect(() => {
    if (counter || finished)
      setTimeInfos({hoursCardId: hoursCardId, inputTime: input, outputTime: output, workedTime: workedTime, extraTime: extraTime, actualDate: loginDate, finishedDay: finished, markCounter: counter, userId: route.params.userInfos.userId});
  }, [counter, finished]);

  useEffect(() => {
    if (timeInfos)
      hoursCardService.insertValues({timeInfos: timeInfos});
    }, [timeInfos]);
    
  const markTime = () => {
    if (!finished) {
      if (counter % 2 == 0) {
        if (counter < mark) {
          setInput(input ? input + " " + timer : timer);
          setCounter(counter + 1);
        } else {
          Alert.alert("Negado", `Você já marcou seu limite de ${mark/2} entradas e ${mark/2} saídas!`);
        }
      } else {
        setOutput(output ? output + " " + timer : timer);
        setWorkedTime(workedTime || workedTime == 0 ? workedTime + (timer.slice(0,2) - input.split(" ")[input.split(" ").length - 1].slice(0,2)) : timer.slice(0,2) - input.slice(0,2));

        if (workedTime || workedTime == 0 ? workedTime + (timer.slice(0,2) - input.split(" ")[input.split(" ").length - 1].slice(0,2)) > workBrandId : timer.slice(0,2) - input.slice(0,2) > workBrandId) {
          setExtraTime(workedTime || workedTime == 0 ? workedTime + (timer.slice(0,2) - input.split(" ")[input.split(" ").length - 1].slice(0,2)) - workBrandId : (timer.slice(0,2) - input.slice(0,2)) - workBrandId);
        } else {
          setExtraTime(0);
        }
        setCounter(counter + 1);
      }
    } else {
      Alert.alert("Negado", "Você já finalizou o dia!");
    }
  }

  const finishTime = () => {
    if (!finished) {
      if (output && counter % 2 == 0) {
        Alert.alert("Finalizar", "Tem certeza que deseja finalizar agora?" , [
          {text: "SIM", onPress: () => setFinished(true)},
          {text: "NÃO"}
        ]);
      } else {
        Alert.alert("Negado", "Você não deu uma saída antes!")
      }
    } else {
      Alert.alert("Negado", "Você já finalizou o dia!");
    }
  }

  const disconnect = () => {
    Alert.alert("Desconectar", "Tem certeza que deseja desconectar agora?" , [
      {text: "SIM", onPress: () => navigation.goBack()},
      {text: "NÃO"}
    ]);
  }

  const createValues = () => {
    hoursCardService.insertValues({timeInfos: {actualDate: loginDate, finishedDay: false, markCounter: 0, userId: route.params.userInfos.userId}});
    setTimeout(() => {
      hoursCardService.findByDate({id: route.params.userInfos.userId, date: loginDate.toISOString().split("T")[0], setHoursCardId, setInput, setOutput, setWorkedTime, setExtraTime, setFinished, setCounter});
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <HeaderHome 
        function={disconnect}
        name={`Olá, ${route.params.userInfos.fullName.split(" ")[0]}!`}
      />
      <ScrollView>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={require("../img/icons/time.png")}
            tintColor="#3A9739"
          />
          <Text style={styles.clock}>{timer}</Text>
        </View>
        <View style={styles.containerButton}>
          <GreenButton
          function={markTime}
          text="MARCAR"
          />
          <GreenButton
          function={finishTime}
          text="FINALIZAR"
          />
        </View>
        <View style={styles.containerHistory}>
          <Text style={styles.historyText}>ENTRADAS</Text>
          <Text style={styles.historyText}>{input}</Text>
        </View>
        <View style={styles.containerHistory}>
          <Text style={styles.historyText}>SAÍDAS</Text>
          <Text style={styles.historyText}>{output}</Text>
        </View>
        <View style={styles.results}>
          <View style={styles.containerResults}>
            <Text style={styles.extraText}>HORAS EXTRAS</Text>
            <Text style={styles.extraText}>{extraTime}</Text>
          </View>
          <View style={styles.containerResults}>
            <Text style={styles.totalText}>HORAS TRABALHADAS</Text>
            <Text style={styles.totalText}>{workedTime}</Text>
          </View>
        </View>
      </ScrollView>
      <MirrorButton
        navigation={navigation}
        userInfos={route.params.userInfos}
        dir={require("../img/icons/ticket.png")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1
  },
  
  containerImage: {
    alignItems: "center"
  },
  
  containerButton: {
    marginTop: 30,
    marginLeft: 60,
    marginRight: 60,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  
  containerHistory: {
    marginLeft: 70,
    marginRight: 70,
    marginTop: 30,
    borderBottomWidth: 4,
    justifyContent: "center",
    borderBottomColor: "#3A9739",
    borderStyle: "dotted"
  },
  
  containerResults: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
    flexDirection: "row",
    justifyContent: "space-between" 
  },

  image: {
    marginTop: 30,
    height: 150,
    width: 150
  },

  clock: {
    marginTop: 30,
    fontSize: 60,
    textAlign: "center",
    color: "#3A9739"
  },
  
  results: {
    marginBottom: 200,
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 4,
    borderRadius: 100,
    borderColor: "#3A9739"
  },

  historyText: {
    fontSize: 25,
    textAlign:"center",
    fontWeight: "bold",
    color: "#3A9739"
  },
  
  totalText: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3A9739"
  },
  
  extraText: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF0000"
  }
})
