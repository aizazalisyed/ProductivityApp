import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddActivityScreen from "../screens/AddActivityScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }} // Add this line to hide headers globally
      >
        <Stack.Screen name="AddActivity" component={AddActivityScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Ensure this screen exists */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
