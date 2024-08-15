import {StyleSheet, View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


export default function Home() {

  const navigation = useNavigation();

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown : false,
    });
  },[])
  return (
    <View >
      <Text>index</Text>
    </View>
  )
}
