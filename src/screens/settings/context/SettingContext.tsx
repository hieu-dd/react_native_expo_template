import React from "react"

interface SettingContextType {
  // Add setting-specific state properties here
}

export const SettingContext = React.createContext<SettingContextType>({
  // Initialize context with default values
})

export const useSettingContext = () => {
  return React.useContext(SettingContext)
}
