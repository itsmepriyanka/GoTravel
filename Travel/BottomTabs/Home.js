

import { View, Text, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import icon from "../assets/icon.png";
import { beaches, forests, mountains, hill, lakes, religious } from "../assets";
import styles from '../assets/styles';
import MenuContainer from '../components/MenuContainer';
import { useNavigation } from '@react-navigation/native';
import { config } from '../config/config';


export default function Home() {
  const navigation = useNavigation();
  const [type, setType] = useState("beaches"); 
  const [query, setQuery] = useState(''); 
  const [placeLocation, setPlaceLocation] = useState([]);
  const [places, setPlaces] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    // Fetch all places on initial load or when the component is focused
    // const baseUrl = "http://10.0.2.2:5513/api"
    fetch(`${config.baseUrl}/places`)
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
        if (!isSearching) {
          setPlaceLocation(data); // Set initial data
        }
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, [isSearching]);

  const handleSearch = async () => {
    try {
      // setIsSearching(true); // Set searching state to true
      const response = await fetch(`${config.b}/places?location=${query}`);
      const locationData = await response.json();
      console.log("location data",locationData);
      setPlaceLocation(locationData);
      setQuery('');
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 30 }}>
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
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by location"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch} // Trigger search when pressing enter
          />
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome name="search" size={20} color="#000" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {isSearching && placeLocation.length > 0 ? (
        <FlatList
          data={placeLocation}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PlaceDetail", { param: item })}
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
      ) : (

        <>
        {/* <ScrollView> */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              <MenuContainer key="beaches" title="beach" imageSrc={beaches} type={type} setType={setType} />
              <MenuContainer key="hills" title="hills" imageSrc={hill} type={type} setType={setType} />
              <MenuContainer key="mountains" title="mountains" imageSrc={mountains} type={type} setType={setType} />
              <MenuContainer key="forests" title="forests" imageSrc={forests} type={type} setType={setType} />
              <MenuContainer key="lakes" title="lakes" imageSrc={lakes} type={type} setType={setType} />
              <MenuContainer key="religious" title="religious" imageSrc={religious} type={type} setType={setType} />
            </View>
          </ScrollView>

       
          {/* </ScrollView> */}
          <View>
            <Text style={{ color: "#2C7379", fontSize: 25, fontWeight: '500', marginLeft: 10 }}>
              Top Tips
            </Text>
          </View>
          <FlatList
            data={places}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("PlaceDetail", { param: item })}
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
          </>
      )}
    </SafeAreaView>
  );
}
