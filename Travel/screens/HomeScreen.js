
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import HeroImage from "../assets/HeroImage.png";



export const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* First Section */}

      <View style={styles.firstSec}>
        <View style={styles.Goview}>
          <Text style={styles.Go}>Go</Text>
        </View>
        <Text style={styles.travel}>Travel</Text>
      </View>

      {/* Second Section */}
      <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
        <Text style={{ fontSize: 42, color: "#3C6072" }}>
          Enjoy the trip with
        </Text>
        <Text style={{ fontSize: 38, color: "#00BCC9", fontWeight: "bold" }}>
          Good Moments
        </Text>

        <Text style={{ fontSize: 16, color: "#3C6072" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti odio
          quis nostrum
        </Text>
      </View>
     

      {/* Image container */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={HeroImage}
          style={{ width: "100%", height: "100%", marginTop: 20 }}
        />

        <TouchableOpacity        
          onPress={() => navigation.navigate("RootLayoutNav")}
          style={{
            position: "absolute",
            bottom: 110,
            width: 58,
            height: 58,
            borderColor: "#00BCC9",
            borderWidth: 5,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            style={{
              width: 45,
              height: 45,
              borderRadius: 25,
              backgroundColor: "#00BCC9",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, color: "#FFFFFF", fontWeight: "600" }}>            
              Go
            </Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  firstSec: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginTop: 32,
    alignItems: "center",
  },
  Goview: {
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  Go: {
    color: "#00BCC9",
    fontSize: 24,
    fontWeight: "600",
  },
  travel: {
    color: "#2A2B4B",
    fontSize: 24,
    fontWeight: "600",
  },
});