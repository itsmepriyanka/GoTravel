import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {HomeScreen} from "./screens/HomeScreen";
import RootLayoutNav from "./screens/RootLayoutNav";
import PlaceDetail from "./screens/PlaceDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} /> 
          <Stack.Screen name="RootLayoutNav" component={RootLayoutNav} />
          <Stack.Screen name="PlaceDetail" component={PlaceDetail} />  
          {/* <Stack.Screen name="PlaceDetail" component={PlaceDetail} />        */}
        </Stack.Navigator>
      </NavigationContainer>        
  );
}

