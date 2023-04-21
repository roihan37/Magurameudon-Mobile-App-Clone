import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import OurMenuPage from "./views/OurMenuPage";
import { Text, Image, View, Button } from "react-native";
import {  ApolloProvider } from '@apollo/client';
import BrandaPage from "./views/BrandaPage";
import DetailFood from "./views/DetailFood";
import client from "./config/apollo";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackShowDetail = () => {
  return (
    // <NavigationContainer>
    
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "OurMenu") {
                iconName = focused ? "fast-food" : "fast-food-outline";
              } else if (route.name === "Beranda") {
                iconName = focused ? "home" : "home-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Beranda"
            options={{
              headerShown: false,
            }}
            component={BrandaPage}
          />
          <Tab.Screen
            options={{
              headerShown: false,
            }}
            name="OurMenu"
            component={OurMenuPage}
          />
        </Tab.Navigator>
   
    // </NavigationContainer>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Magurameudon" options={{headersShown : false}} component={StackShowDetail} />
          <Tab.Screen name="Detail Food" component={DetailFood} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
