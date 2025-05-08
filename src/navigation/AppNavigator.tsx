import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen, ExplorerScreen, ProfileScreen, SettingScreen, DetailScreen } from "@/screens"
import { EXPLORER, HOME, MAIN_TABS, DETAIL, PROFILE, SETTING } from "./Routers"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={HOME} component={HomeScreen} />
      <Tab.Screen name={EXPLORER} component={ExplorerScreen} />
      <Tab.Screen name={PROFILE} component={ProfileScreen} />
      <Tab.Screen name={SETTING} component={SettingScreen} />
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MAIN_TABS}>
        <Stack.Screen
          name={MAIN_TABS}
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={DETAIL} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
