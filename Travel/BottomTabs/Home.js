import {StyleSheet, View, Text, SafeAreaView ,Image, ScrollView} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; 
import { useNavigation } from '@react-navigation/native'
import icon from "../assets/icon.png"
import MenuContainer from "../components/MenuContainer";

export default function Home() {

  const navigation = useNavigation();

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown : false,
    });
  },[])
  return (
    <SafeAreaView style={{marginTop:30}}>
       <View 
       style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32, }}>
        <View>
          <Text style={{fontSize: 40,color: '#0B646B',fontWeight: 'bold',}}>Discover</Text>
          <Text style={{color: '#527283',fontSize: 36,}}>the beauty today</Text>
        </View>

        <View style={styles.TopimageContainer}>
          <Image
            source={icon}
            style={{width: '100%',height: '100%',borderRadius: 8,}}
          />
        </View>
      </View>
      <View style={styles.searchcontainer}>
      <GooglePlacesAutocomplete
      placeholder="Search"/>
      </View>
      {/* <ScrollView>
      <View className=" flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>
      </ScrollView> */}
    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
TopimageContainer: {
  width: 48,
  height: 48,
  backgroundColor: 'gray',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, 
},
searchcontainer: {
  flexDirection: 'row',           // flex-row
  alignItems: 'center',           // items-center
  backgroundColor: 'white',       // bg-white
  marginHorizontal: 16,           // mx-4 translates to marginHorizontal: 16 (4 * 4)
  borderRadius: 12,               // rounded-xl translates to borderRadius: 12
  paddingVertical: 4,             // py-1 translates to paddingVertical: 4 (1 * 4)
  paddingHorizontal: 16,          // px-4 translates to paddingHorizontal: 16 (4 * 4)
  marginTop: 16,                  // mt-4 translates to marginTop: 16 (4 * 4)
  shadowColor: '#000',            // shadow-lg equivalent
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,                   // For Android shadow
},

});