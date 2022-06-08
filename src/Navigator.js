import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import MirrorSheet from "./screens/MirrorSheet";

export default () => {

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    BackHandler.addEventListener("backPress", () => true);
    return () => BackHandler.removeEventListener("backPress", () => true);
  }, []);

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MirrorSheet"
          component={MirrorSheet}
          options={{ headerShown: false }}
          />   
      </Stack.Navigator>
    </NavigationContainer>
  )
}
