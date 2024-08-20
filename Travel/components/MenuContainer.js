import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handlePress}
      >
        <View
          style={[
            styles.imageContainer,
            type === title.toLowerCase() && styles.activeImageContainer
          ]}
        >
          <Image source={imageSrc} style={styles.image} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    width: 96,
    height: 96,
    padding: 5,
    marginLeft:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeImageContainer: {
    backgroundColor: '#e0e0e0', // Gray-200 equivalent
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    resizeMode: 'cover',
  },
  title: {
    color: '#00BCC9',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
    marginLeft:20,
  },
});

export default MenuContainer;
