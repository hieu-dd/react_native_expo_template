import React from "react"

interface DetailContextType {
  id?: string
}

export const DetailContext = React.createContext<DetailContextType>({
  id: undefined,
})

export const useDetailContext = () => {
  return React.useContext(DetailContext)
}
