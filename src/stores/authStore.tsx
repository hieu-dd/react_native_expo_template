import { WalletAddress } from "@/types/index.types"
import { create } from "zustand"

interface AuthState {
  isAuthenticated: boolean
  address?: WalletAddress
  setAddress: (address?: WalletAddress) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  address: undefined,
  setAddress: (address?: WalletAddress) => set({ address }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
}))

export default useAuthStore
