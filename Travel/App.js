import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {HomeScreen} from "./screens/HomeScreen";
import RootLayoutNav from "./screens/RootLayoutNav";
import { View } from "react-native-animatable";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} /> 
          <Stack.Screen name="RootLayoutNav" component={RootLayoutNav} />       
        </Stack.Navigator>
      </NavigationContainer>        
  );
}

