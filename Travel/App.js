import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {StyleSheet, View, Text,SafeAreaView } from 'react-native'

import Home from "./BottomTabs/Home";
import Profile from "./BottomTabs/Profile";
import Category from "./BottomTabs/Category";
import Bookmarks from "./BottomTabs/Bookmarks";
import Search from "./BottomTabs/Search";
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarActiveTintColor: "purple",
        }}
      >
        <Tab.Screen name="Home" component={Home} 
         options={{
          // tabBarLabel: "My Profile",
          tabBarIcon: () => <Ionicons name={"home"} size={20} />,
          // tabBarBadge: 3,
        }}/>
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            // tabBarLabel: "My Profile",
            tabBarIcon: () => <Ionicons name={"search"} size={20} />,
            // tabBarBadge: 3,
          }}
        />
        <Tab.Screen 
          name="category" 
          component={Category} 
          options={{
            // tabBarLabel: "My Profile",
            tabBarIcon: () => <Ionicons name={"book"} size={20} />,
            // tabBarBadge: 3,
          }}/>
        <Tab.Screen
          name="Book mark"
          component={Bookmarks}
          options={{
            tabBarLabel: "Bookmarks",
            tabBarIcon: () => <Ionicons name={"bookmark"} size={20} />,
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "My Profile",
            tabBarIcon: () => <Ionicons name={"person"} size={20} />,
            // tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}




