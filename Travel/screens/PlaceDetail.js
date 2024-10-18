import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RecommendedPlaces from '../components/RecommendedPlaces';
import { config } from '../config/config';

const PlaceDetail = () => {
  const route = useRoute();
  const { param: place } = route.params;
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
    // const baseUrl = "http://10.0.2.2:5513/api"

        const response = await fetch(`${config.baseUrl}/places/${place._id}`);
        const res = await response.json();
        setPlaces(res);
        
      } catch (error) {
        console.error('Error fetching place details or recommended places:', error);
      }
    };

    fetchPlaceDetails();
  }, [place._id]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: places.coverImage }} style={styles.image} />
      <Text style={styles.title}>{places.title}</Text>
      <View style={styles.locationContainer}>
        <FontAwesome name="map-marker" size={20} color="#0B646B" />
        <Text style={styles.location}>{places.location}</Text>
      </View>
      <Text style={styles.category}>Category: {places.category}</Text>
      <Text style={styles.description}>{places.description}</Text>

      {places.description && <RecommendedPlaces description={places.description}/>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#0B646B',
    marginLeft: 4,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  recommendedPlaceContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  recommendedPlaceTitle: {
    fontSize: 18,
    color: '#333',
  },
  similarityScore: {
    fontSize: 16,
    color: '#0B646B',
  },
});

export default PlaceDetail;
