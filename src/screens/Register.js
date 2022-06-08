import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StatusBar, Alert, StyleSheet } from "react-native";

import Inputs from "../components/Inputs";
import { PickerForm } from "../components/Pickers";
import { WhiteButton, SubmitButton } from "../components/Buttons";
import * as brandsService from "../services/brandsService";
import * as usersService from "../services/usersService";

export default ({navigation}) => {
  
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState(0);
  const [listBrand, setListBrand] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [registerInfos, setRegisterInfos] = useState({});
  let invalidField = {label: "", invalid: false};

  useEffect(() => {
    brandsService.findAll({setListBrand});
  }, []);

  useEffect(() => {
    brandsService.findByName({name: brand.slice(6), setBrandId});
  }, [brand]);

  useEffect(() => {
    setRegisterInfos({fullName: name, brandId: brandId, email: newEmail, password: newPassword});
  }, [name, brandId, newEmail, newPassword]);

  const verifyValues = () => {
    invalidField.invalid = false;
    Object.entries(registerInfos).forEach(field => {
      if (!field[1] && !invalidField.invalid)
        invalidField = {label: field[0], invalid: true}
    });
    invalidField.invalid ? Alert.alert("Campo inválido", `O campo ${invalidField.label} está vazio!`) : usersService.verifyEmail({email: newEmail, postValues});
  }

  const postValues = isCreated => {
    if (isCreated) {
      usersService.insertValues({registerInfos: registerInfos});
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!" , [
          {text: "Ok", onPress: () => navigation.navigate("Login")},
      ]
      );
    } else {
      Alert.alert("Falha ao registrar", `O email ${newEmail} já existe!`);
      setNewEmail("");
      setNewPassword("");
    }
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
          <Text style={styles.pageText}>Registrar</Text>
        </View>
        <Inputs
          label="Nome"
          placeholder="Digite seu nome"
          type="default"
          secure={false}
          data={name}
          setData={setName}
        />
        <PickerForm
          label="Setor"
          data={brand}
          setData={setBrand}
          list={listBrand}
        />
        <Inputs
          label="Email"
          placeholder="Digite seu email"
          type="email-address"
          secure={false}
          data={newEmail}
          setData={setNewEmail}
        />
        <Inputs
          label="Senha"
          placeholder="Digite uma senha"
          type="default"
          secure={true}
          data={newPassword}
          setData={setNewPassword}
        />
        <View style={styles.containerButtons}>
          <WhiteButton
            navigation={navigation}
            route="Login"
            text="Voltar"
          />
          <SubmitButton
            function={verifyValues}
            text="Registrar"
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#5A9359"
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
    marginBottom: 35,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
