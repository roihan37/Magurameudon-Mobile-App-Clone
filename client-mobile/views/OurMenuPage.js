import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  View,
  ScrollView,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS, GET_ITEMS_OURMENU } from "../queries/index";
import { Card } from "../components/Card";
import SpecifiedView from "../components/SpecifiedView";

export default function OurMenuPage({ navigation }) {
  const { loading, error, data } = useQuery(GET_ITEMS_OURMENU);

  if (loading) {
    return (
      <View className="flex w-full h-full bg-white items-center justify-center">
        <Image
          className=""
          source={require("../assets/31613-ramen-bowl.gif")}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex w-full h-full bg-white items-center justify-center">
        <Text>Internal Server Error ...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex w-full h-full bg-white items-center justify-center">
        <Text>Data Not Found ...</Text>
      </View>
    );
  }
  // console.log(data)
  return (
    <SpecifiedView>
      <ScrollView className="bg-white ">
        <View className="flex flex-row flex-wrap justify-between mx-[14px] mb-[50px] mt-[20px]">
          {data?.getAllItems?.map((el) => {
            return <Card el={el} key={el.id} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
    </SpecifiedView>
  );
}
