import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LandingNavigator } from "./landing.navigator";
import { AppNavigator } from "./app.navigator"
import { useSelector } from 'react-redux';

export const Navigation = () => {
  const continueData = useSelector((store) => store.continueData.continueData);

  return (
    <NavigationContainer>
      {continueData ? <AppNavigator /> : <LandingNavigator />}
    </NavigationContainer>
  );
};
