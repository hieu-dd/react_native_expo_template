import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList, DETAIL } from "@/navigation/Routers"

type DetailScreenRouteProp = RouteProp<RootStackParamList, typeof DETAIL>

export const useDetail = () => {
  const route = useRoute<DetailScreenRouteProp>()
  const { id } = route.params || {}

  const contextValue = { id }
  return { contextValue }
}
