import React from "react"

interface HomeContextType {}

export const HomeContext = React.createContext<HomeContextType>({})

export const useHomeContext = () => {
  return React.useContext(HomeContext)
}
