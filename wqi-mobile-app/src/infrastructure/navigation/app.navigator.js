import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LandingPageScreen } from "../../features/main/screens/landingpage.screen";

const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Landing" component={LandingPageScreen} />
    </Stack.Navigator>
  );
}

export const AppNavigator = () => <MyTabs />;
