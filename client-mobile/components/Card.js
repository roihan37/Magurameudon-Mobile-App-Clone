import { Text,Image, View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export function Card({el, navigation}){

    const getDescription = (description) => {
        return description?.length > 40
        ? description.substring(0, 40) + '...'
        : description
      }
    
      const showDetail = (foodId) => {
        navigation.navigate('Detail Food', {foodId} )
      }
    
    return (

        <TouchableWithoutFeedback onPress={() => {
            showDetail(el.id)
          }}>
            <View style={styles.shadow} className='rounded-[10px] p-[5px] justify-between bg-white overflow-hidden flex flex-col mb-[15px] w-[170px]  '>
            <Image className='w-[155px] h-[125px]' 
                source={{
                  uri : `${el.imgUrl}`
                }}
                />
                <View className='p-[5px]'>
                  <Text className='text-m capitalize mb-[5px] font-normal text-gray-600'>{el.name}</Text>
                  <Text className='font-bold mb-[5px] text-gray-600'>Rp.{el.price},00</Text>
                  <Text className="font-light mb-[5px] text-[12px]">
                {getDescription(el.description)}
                </Text>
                  <View className=' flex  items-end'>
                    <Text className='font-bold text-red-500  '>{el.Category.name}</Text>
                  </View>
                </View>
            </View>
          </TouchableWithoutFeedback>


    )
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