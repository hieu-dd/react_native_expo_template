import * as React from "react"
import { SettingContext } from "./context/SettingContext"
import { useSetting } from "./hooks/useSetting"
import SettingView from "./SettingView"

const SettingScreen = () => {
  const { contextValue } = useSetting()
  return (
    <SettingContext.Provider value={contextValue}>
      <SettingView />
    </SettingContext.Provider>
  )
}

export default SettingScreen
