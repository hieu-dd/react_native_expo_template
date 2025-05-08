import { useHomeStore } from "../stores/homeStore"

export const useHome = () => {
  const homeStore = useHomeStore()
  const contextValue = {
    address: homeStore.address,
    data: homeStore.data,
    isLoading: homeStore.isLoading,
    isError: homeStore.isError,
    filter: homeStore.filter,
    updateFilter: homeStore.updateFilter,
  }
  return { contextValue }
}
