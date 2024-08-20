import { View, Text, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from '@react-navigation/native';
import icon from "../assets/icon.png";
import { beaches, forests, mountains, hill, lakes, religious } from "../assets";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from '../assets/styles';
import MenuContainer from '../components/MenuContainer';

export default function Home() {

  const navigation = useNavigation();
  const [type, setType] = useState("beaches"); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.65:5513/api/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 30, }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>the beauty today</Text>
        </View>
        <View style={styles.TopimageContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete placeholder="Search" />
      </View> 
      <ScrollView>  
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View style={styles.categoryContainer}>
            <MenuContainer style={{ borderRadius: 48}}
              key={"beaches"}
              title="beach"
              imageSrc={beaches}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"hills"}
              title="hills"
              imageSrc={hill}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"mountains"}
              title="mountains"
              imageSrc={mountains}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"forests"}
              title="forests"
              imageSrc={forests}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"lakes"}
              title="lakes"
              imageSrc={lakes}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"religious"}
              title="religious"
              imageSrc={religious}
              type={type}
              setType={setType}
            />
          </View>
      </ScrollView> 

      <View >
        <Text style={{color:"#2C7379" ,fontSize:25, fontWeight:'500', marginLeft:10}} >
          Top Tips
        </Text>              
      </View>   

      <FlatList
        data={places}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ItemScreen", { param: item })}
            style={styles.card}
          >          
            <Image source={{ uri: item.coverImage }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.locationContainer}>
                <FontAwesome name="map-marker" size={16} color="#0B646B" style={styles.locationIcon} />
                <Text style={styles.cardLocation}>{item.location}</Text>
              </View>              
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />     
</ScrollView>
    </SafeAreaView>
  );
}


