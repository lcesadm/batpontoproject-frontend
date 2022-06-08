import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StatusBar, Alert, StyleSheet } from "react-native";

import Inputs from "../components/Inputs";
import { WhiteButton, SubmitButton } from "../components/Buttons";
import * as usersService from "../services/usersService";

export default ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginInfos, setLoginInfos] = useState({});
  const [userInfos, setUserInfos] = useState();
  let invalidField = {label: "", invalid: false};

  useEffect(() => {
    setLoginInfos({email: email, password: password});
  }, [email, password]);

  useEffect(() => {
    if (userInfos)
      navigation.navigate("Home", {userInfos: userInfos});
  }, [userInfos]);

  const postLogin = () => {
    Object.entries(loginInfos).forEach(field => {
      if (!field[1] && !invalidField.invalid)
        invalidField = {label: field[0], invalid: true}
    });
    invalidField.invalid ? Alert.alert("Campo inválido", `O campo ${invalidField.label} está vazio!`) : usersService.findByLogin({email: email, password: password, setEmail, setPassword, setUserInfos});
  }

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#5A9359"
        barStyle="default"
      />
      <ScrollView>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>BatPonto</Text>
        <Image
          style={styles.image}
          source={require("../img/icons/user.png")}
          tintColor="#FFF"
        />
        <Text style={styles.pageText}>Login</Text>
      </View>
      <Inputs
        label="Email"
        placeholder="Digite seu email"
        type="email-address"
        secure={false}
        data={email}
        setData={setEmail}
      />
      <Inputs
        label="Senha"
        placeholder="Digite sua senha"
        type="default"
        secure={true}
        data={password}
        setData={setPassword}
      />
      <View style={styles.containerButtons}>
        <WhiteButton
          navigation={navigation}
          route="Register"
          text="Registrar"
        />
        <SubmitButton
          function={postLogin}
          text="Login"
        />
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor:"#5A9359"
  },
  
  containerHeader: {
    alignItems: "center"
  },

  title: {
    fontSize: 60,
    color: "#FFF",
    fontWeight: "bold"
  },

  image: {
    height: 180,
    width: 180
  },

  pageText: {
    fontSize: 50,
    color: "#FFF",
    fontWeight: "bold"
  },

  containerButtons: {
    marginTop: 50,
    marginLeft: 60,
    marginRight: 60,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
