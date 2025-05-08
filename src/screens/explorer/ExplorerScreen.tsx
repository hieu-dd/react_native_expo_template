import * as React from "react"
import { ExplorerContext } from "./context/ExplorerContext"
import { useExplorer } from "./hooks/useExplorer"
import ExplorerView from "./ExplorerView"

const ExplorerScreen = () => {
  const { contextValue } = useExplorer()
  return (
    <ExplorerContext.Provider value={contextValue}>
      <ExplorerView />
    </ExplorerContext.Provider>
  )
}

export default ExplorerScreen
