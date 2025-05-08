import React from "react"

interface ExplorerContextType {
  // Add explorer-specific state properties here
}

export const ExplorerContext = React.createContext<ExplorerContextType>({
  // Initialize context with default values
})

export const useExplorerContext = () => {
  return React.useContext(ExplorerContext)
}
