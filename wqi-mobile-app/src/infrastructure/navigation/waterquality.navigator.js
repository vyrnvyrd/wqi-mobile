import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { SearchPageScreen } from "../../features/water_quality/screens/searchpage.screen";

const WaterQualityStack = createStackNavigator();

export const WaterQualitysNavigator = () => {
  return (
    <WaterQualityStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false
      }}>
      <WaterQualityStack.Screen name="Search" component={SearchPageScreen} />
    </WaterQualityStack.Navigator>
  );
};
