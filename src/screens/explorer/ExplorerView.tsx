import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useExplorerContext } from "./context/ExplorerContext"

const ExplorerView = () => {
  // Use context data as needed
  // const { someData } = useExplorerContext()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explorer Screen</Text>
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
  },
})

export default ExplorerView
