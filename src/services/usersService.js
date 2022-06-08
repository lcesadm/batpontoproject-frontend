import { Alert } from "react-native";

export const findByLogin = props => {
  fetch("http://10.0.2.2:8080/users/findByLogin/" + props.email + "/" + props.password, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(res => res.json())
      .then(data => {
        props.setUserInfos({userId: data[0], fullName: data[1], brandId: data[2]});
        props.setEmail("");
        props.setPassword("");
    })
      .catch(error => {
        Alert.alert("Falha ao logar", "Email ou senha inválidos!\n" + error);
        props.setPassword("");
    });
}

export const verifyEmail = props => {
  fetch("http://10.0.2.2:8080/users/verifyEmail/" + props.email, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(res => res.json())
      .then(data => props.postValues(data))
      .catch(error => console.warn(error));
}

export const insertValues = props => {
  fetch("http://10.0.2.2:8080/users", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props.registerInfos)
  })
    .catch(error => console.warn(error));
}
