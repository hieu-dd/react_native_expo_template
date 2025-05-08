import * as React from "react"
import { StyleSheet } from "react-native"
import { ProfileContext } from "./context/ProfileContext"
import { useProfile } from "./hooks/useProfile"
import ProfileView from "./ProfileView"

const ProfileScreen = () => {
  const { contextValue } = useProfile()
  return (
    <ProfileContext.Provider value={contextValue}>
      <ProfileView />
    </ProfileContext.Provider>
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

export default ProfileScreen
