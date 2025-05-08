import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useDetailContext } from "./context/DetailContext"

const DetailView = () => {
  const { id } = useDetailContext()

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

export default DetailView
