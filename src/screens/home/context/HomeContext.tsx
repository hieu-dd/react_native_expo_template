import React from "react"

interface HomeContextType {
  address?: string
  data?: string[]
  isLoading: boolean
  isError: boolean
  filter: string
  updateFilter: (newFilter: string) => void
}

export const HomeContext = React.createContext<HomeContextType>({
  address: undefined,
  data: undefined,
  isLoading: false,
  isError: false,
  filter: "",
  updateFilter: () => {},
})

export const useHomeContext = () => {
  return React.useContext(HomeContext)
}
