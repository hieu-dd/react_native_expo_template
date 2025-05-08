import * as React from "react"
import { DetailContext } from "./context/DetailContext"
import { useDetail } from "./hooks/useDetail"
import DetailView from "./DetailView"

const DetailScreen = () => {
  const { contextValue } = useDetail()
  return (
    <DetailContext.Provider value={contextValue}>
      <DetailView />
    </DetailContext.Provider>
  )
}

export default DetailScreen
