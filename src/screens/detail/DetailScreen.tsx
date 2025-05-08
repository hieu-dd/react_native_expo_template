import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList, DETAIL } from "@/navigation/Routers"

type DetailScreenRouteProp = RouteProp<RootStackParamList, typeof DETAIL>

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>()
  const { id } = route.params || {}

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
      {id && <Text style={styles.idText}>ID: {id}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  idText: {
    fontSize: 18,
    color: "#666",
  },
})

export default DetailScreen
