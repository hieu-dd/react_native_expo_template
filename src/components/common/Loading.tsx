import useLoadingStore from "@/stores/loadingStore"
import React from "react"
import { View, ActivityIndicator, StyleSheet, Text, Button } from "react-native"

const Loading = () => {
  const { setLoading } = useLoadingStore()
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3498db" />
      <Text style={styles.text}>Loading...</Text>
      <Button
        title="Cancel"
        onPress={() => {
          setLoading(false)
        }}
        color="#e74c3c"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
})

export default Loading
