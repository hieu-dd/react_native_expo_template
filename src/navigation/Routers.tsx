import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export const MAIN_TABS = "MainTabs"
export const HOME = "Home"
export const DETAIL = "Detail"
export const EXPLORER = "Explorer"
export const PROFILE = "Profile"
export const SETTING = "Setting"

// Legacy object for backward compatibility
export const RouterKeys = {
  MainTabs: MAIN_TABS,
  Home: HOME,
  Detail: DETAIL,
  Explorer: EXPLORER,
  Profile: PROFILE,
  Setting: SETTING,
}

export type RootStackParamList = {
  MainTabs: undefined
  Home: undefined
  Secondary: undefined
  Detail: { id?: string }
}

export type TabParamList = {
  Home: undefined
  Explorer: undefined
  Profile: undefined
  Setting: undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const useAppNavigaton = () => {
  return useNavigation<NavigationProp>()
}
