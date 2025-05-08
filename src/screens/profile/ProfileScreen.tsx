import * as React from "react"
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

export default ProfileScreen
