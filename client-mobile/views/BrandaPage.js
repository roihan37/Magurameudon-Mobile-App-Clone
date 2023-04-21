import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text, Image, View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../queries";
import SpecifiedView from "../components/SpecifiedView";

export default function BrandaPage({ navigation }) {
  const showDetail = (foodId) => {
    navigation.navigate("Detail Food", { foodId });
  };

  const getDescription = (description) => {
    return description?.length > 50
      ? description.substring(0, 50) + "..."
      : description;
  };

  const getTitle = (title) => {
    return title?.length > 15 ? title.substring(0, 15) + "..." : title;
  };

  const { loading, error, data } = useQuery(GET_ITEMS);

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
  // console.log(loading, error, data);

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

  
  return (
    <SpecifiedView>
      <ScrollView>
        <View className="flex justify-between flex-col h-full">
          {/* Benner */}
          <View
            style={{
              flex: 1,
            }}
          >
            <Image
              className="w-full h-[200px]"
              source={{
                uri: "https://www.marugameudon.co.id/webroot/files/AboutSliders/picture/1674441379/FA_MU_Web%20banner_STU_1280x680px.jpg",
              }}
            />
          </View>

          {/* CARD */}
          <View className="mt-[30px]  bg-white">
            <View className="flex px-[20px] flex-row mb-[25px]">
              <View className="w-[7px] h-[19px] mr-[8px] bg-red-500"></View>
              <View className="w-[7px] h-[19px] mr-[8px] bg-red-500"></View>
              <View className="w-[7px] h-[19px] bg-red-500"></View>
            </View>
            <View className="flex flex-row px-[20px] justify-between items-center ">
              <View>
                <Text className="text-[18px] font-extrabold">
                  PROMO DAN HADIAH
                </Text>
                <Text>Hanya Untuk Member</Text>
              </View>
              <Button
                buttonColor="white"
                textColor="black"
                mode="contained"
                onPress={() => navigation.navigate("OurMenu")}
              >
                Lihat Semua
              </Button>
            </View>
            <ScrollView horizontal={true} className="w-full h-[350px]">
              {/* <View> */}
              {data?.getAllItems?.map((el) => {
                return (
                  <View
                    key={el.id}
                    style={styles.shadow}
                    className=" mt-[20px] ml-[15px] p-[10px] w-[200px] h-[300px] mr-[10px] bg-white flex justify-center items-center overflow-hidden rounded-lg "
                  >
                    <Image
                      className="w-[175px] h-[135px] mb-[15px]"
                      source={{
                        uri: `${el.imgUrl}`,
                      }}
                    />
                    <Text className="text-lg font-light text-center text-gray-600">
                      {getTitle(el.name)}
                    </Text>
                    <Text className="font-light">
                      {getDescription(el.description)}
                    </Text>
                    <View className="mt-[10px]">
                      <Button
                        style={{
                          backgroundColor: "rgb(239, 68, 68)",
                        }}
                        buttonColor="red"
                        mode="contained"
                        onPress={() => {
                          showDetail(el.id);
                        }}
                      >
                        See Detail
                      </Button>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          {/* FOOTER */}
          <View className="w-full bg-red-500 h-[560px] flex flex-col  items-center">
            <View className="flex flex-row">
              <View className="w-[7px] h-[20px] mr-[8px] bg-white"></View>
              <View className="w-[7px] h-[20px] mr-[8px] bg-white"></View>
              <View className="w-[7px] h-[20px] bg-white"></View>
            </View>
            <View className="mt-[45px]">
              <Text className="text-1xl font-extrabold text-white">
                PROMO ANNIVERSARY
              </Text>
            </View>
            <View className="mt-[30px] flex flex-col justify-center items-center">
              <Text className="text-2xl font-black tracking-tight text-white">
                SAMBUT PENGALAMAN RASA
              </Text>
              <Text className="text-2xl font-black tracking-tight text-white">
                YANG LEBIH MENGUNTUNGKAN
              </Text>
            </View>
            <View className="mt-[30px] mx-[30px] flex justify-center">
              <Text className="text-white text-center">
                Anniversary Marugame Udon yang ke-10, kamu bisa beli membeli
                produk di bawah ini dengan harga Rp10,000
              </Text>
            </View>
            <View className="mt-[30px]">
              <Button
                buttonColor="white"
                textColor="red"
                mode="contained"
                onPress={() => showDetail(10)}
              >
                See Detail
              </Button>
            </View>
            <View className="mt-[20px]">
              <Image
                className="w-[250px] h-[205px] "
                source={{
                  uri: "https://marugameudon.co.id/webroot/files/MenuDetails/picture/Nikutama%20Zaru%20Udon.png",
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SpecifiedView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
