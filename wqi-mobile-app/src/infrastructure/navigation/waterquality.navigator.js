import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { SearchPageScreen } from "../../features/water_quality/screens/searchpage.screen";
import { DetailPageScreen } from "../../features/water_quality/screens/detailpage.screen";

const WaterQualityStack = createStackNavigator();

export const WaterQualitysNavigator = () => {
  return (
    <WaterQualityStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <WaterQualityStack.Screen name="Search" component={SearchPageScreen} />
      <WaterQualityStack.Screen name="Detail" component={DetailPageScreen} />
    </WaterQualityStack.Navigator>
  );
};
