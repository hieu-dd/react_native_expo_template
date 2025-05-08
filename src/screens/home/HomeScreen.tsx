import React from "react"
import { HomeContext } from "./context/HomeContext"
import { useHome } from "./hooks/useHome"
import HomeView from "./HomeView"

const HomeScreen: React.FC = (): React.ReactElement => {
  const { contextValue } = useHome()
  return (
    <HomeContext.Provider value={contextValue}>
      <HomeView />
    </HomeContext.Provider>
  )
}

export default HomeScreen
