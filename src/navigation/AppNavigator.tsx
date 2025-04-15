import * as React from "react"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "@/screens/home/HomeScreen"
import SecondaryScreen from "@/screens/secondary/SecondaryScreen"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
const Stack = createStackNavigator()

type RootStackParamList = {
  Home: undefined
  Secondary: undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Secondary" component={SecondaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const useAppNavigaton = () => {
  return useNavigation<NavigationProp>()
}

export default AppNavigator
