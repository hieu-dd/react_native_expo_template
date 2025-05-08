import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useAppNavigaton } from "@/navigation/Routers"

const HomeView: React.FC = (): React.ReactElement => {
  //   const { data } = useHomeContext()
  const navigation = useAppNavigaton()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
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

export default HomeView
