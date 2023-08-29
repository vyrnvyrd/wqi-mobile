import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LandingNavigator } from "./landing.navigator";

export const Navigation = () => {
  return (
    <NavigationContainer>
      <LandingNavigator />
    </NavigationContainer>
  );
};
