import useAuthStore from "@/stores/authStore"

export const useProfile = () => {
  const { user, address } = useAuthStore()
  const contextValue = { address, user }
  return { contextValue }
}
