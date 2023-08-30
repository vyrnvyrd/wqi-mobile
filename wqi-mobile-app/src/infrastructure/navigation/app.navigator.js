import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WaterQualitysNavigator } from './waterquality.navigator'

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Searchs: "md-restaurant",
};

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'black',
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
    >
      <Tab.Screen name="Find" component={WaterQualitysNavigator} />
    </Tab.Navigator>
  )
    ;
}

export const AppNavigator = () => <MyTabs />;
