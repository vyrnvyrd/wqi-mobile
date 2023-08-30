import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WaterQualitysNavigator } from './waterquality.navigator'
import { theme } from "../theme";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Find: "search-circle-outline",
};

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: theme.colors.bg.primary
    },
    tabBarActiveTintColor: theme.colors.bg.primary,
    tabBarInactiveTintColor: theme.colors.color.white,
    tabBarActiveBackgroundColor: theme.colors.color.white,
    tabBarStyle: {
      backgroundColor: theme.colors.bg.primary,
      height: 100,
      paddingTop: 10,
      paddingBottom: 25,
      paddingLeft: 160,
      paddingRight: 160
    },
    tabBarLabelStyle: {
      fontSize: 13,
      fontWeight: 'bold'
    },
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={50} color={color} />
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
