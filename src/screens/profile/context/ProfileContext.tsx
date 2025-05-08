import { User, WalletAddress } from "@/types/index.types"
import React from "react"

interface ProfileContextType {
  address?: WalletAddress
  user?: User
}

export const ProfileContext = React.createContext<ProfileContextType>({
  address: undefined,
  user: undefined,
})

export const useProfileContext = () => {
  return React.useContext(ProfileContext)
}
