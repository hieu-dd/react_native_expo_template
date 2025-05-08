import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useProfileContext } from "./context/ProfileContext"

const ProfileView = () => {
  const { address, user } = useProfileContext()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile View</Text>
      <Text style={styles.text}>Address: {address}</Text>
      <Text style={styles.text}>User: {user?.alias}</Text>
    </View>
  )
}

export default ProfileView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
})
