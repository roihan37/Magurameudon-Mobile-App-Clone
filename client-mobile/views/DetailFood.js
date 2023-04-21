import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import SpecifiedView from "../components/SpecifiedView";
import { GET_ITEM_BYID } from "../queries";
// import { useNavigate } from '@react-navigation/native'

export default function DetailFood({ route, navigation }) {
  const { foodId } = route.params;
  // const navigation = useNavigate()
  const { loading, error, data } = useQuery(GET_ITEM_BYID, {
    variables: {
      getItemById: +foodId,
    },
  });

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

  // console.log(loading, error, data);

  return (
    <SpecifiedView>
      <ScrollView>
        {/* <Text>{JSON.stringify(data)}</Text> */}
        <View className="flex" key={data?.getItemById?.id}>
          <Image
            className="w-full h-[300px] "
            source={{
              uri: `${data?.getItemById?.imgUrl}`,
            }}
          />
          <View className="bg-red-500 w-full h-full rounded-t-[30px]">
            <View className="mx-[25px]">
              <Text className=" mt-[30px] text-4xl font-black text-white">
                {data?.getItemById?.name}
              </Text>
              <View className="flex flex-row items-center justify-between">
                <Text className=" font-medium text-[20px] text-white">
                  {data?.getItemById?.Category?.name}
                </Text>
                <Text className="  text-[15px] font-black text-white">
                  Rp.{data?.getItemById?.price},00
                </Text>
              </View>
            </View>
            <View className="w-full h-full rounded-t-[30px] bg-white mt-[20px]  ">
              <View className="mx-[25px] ">
                <View className=" mt-[20px] flex flex-row items-center justify-between">
                  <Text className=" text-2xl font-black text-gray-600 ">
                    Details
                  </Text>
                  <View className="w-auto h-auto bg-red-500 rounded-[20px] flex">
                    {data?.getItemById?.user?.username ? (
                      <Text className=" mx-[15px] my-[5px] mb-[8px] text-[15px] text-white text-center">
                        {data?.getItemById?.user?.username}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                </View>
                <Text className="text-lg mt-[10px]  text-gray-600">
                  {data?.getItemById?.description}
                </Text>
                <Text className="text-lg text-gray-600 mt-[10px]">
                  Ingredients :
                </Text>
                {data?.getItemById.Ingredients?.length ? (
                  data?.getItemById.Ingredients?.map((el) => {
                    return (
                      <Text key={el.id} className="text-[16px] text-gray-600 ">{`- ${el.name}`}</Text>
                    );
                  })
                ) : (
                  <Text className="text-[16px] text-gray-600 ">
                    Engredient Empty
                  </Text>
                )}

                <View className="mt-[20px]">
                  <Button
                    style={{
                      height: 50,
                      backgroundColor: "rgb(239, 68, 68)",
                      paddingTop: 3,
                      marginBottom: 20,
                    }}
                    buttonColor="red"
                    mode="contained"
                    onPress={() => navigation.navigate('OurMenu')}
                  >
                    Back to Menu
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SpecifiedView>
  );
}
