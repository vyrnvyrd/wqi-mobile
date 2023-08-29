import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LandingPageScreen } from "../../features/main/screens/landingpage.screen";
import { SearchPageScreen } from "../../features/water_quality/screens/searchpage.screen";

const Stack = createStackNavigator();

function MyTabs() {
  return (<></>);
}

export const AppNavigator = () => <MyTabs />;
