import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSettingContext } from "./context/SettingContext"

const SettingView = () => {
  // Use context data as needed
  // const { someData } = useSettingContext()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting Screen</Text>
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

export default SettingView
