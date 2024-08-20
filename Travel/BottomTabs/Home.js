import { StyleSheet, View, Text, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from '@react-navigation/native';
import icon from "../assets/icon.png";
import { beaches, forests, mountains, hill, lakes, religious } from "../assets";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import trimDescription from '../components/Trimdescription';
import MenuContainer from '../components/MenuContainer';

export default function Home() {

  const navigation = useNavigation();
  const [type, setType] = useState("beaches"); 
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.73:5513/api/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, []);

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
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.coverImage }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.locationContainer}>
                <FontAwesome name="map-marker" size={16} color="#0B646B" style={styles.locationIcon} />
                <Text style={styles.cardLocation}>{item.location}</Text>
              </View>
              <Text style={styles.cardDescription}>
          {trimDescription(item.description, 25)}
        </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />     
</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 40,
    color: '#0B646B',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#527283',
    fontSize: 36,
  },
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
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,  // Equivalent to px-8
    marginTop: 15,          // Equivalent to mt-8
  },  
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardLocation: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 4,
    marginTop: 6,
  },
});



