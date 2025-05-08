import { User, WalletAddress } from "@/types/index.types"
import { create } from "zustand"

interface AuthState {
  isAuthenticated: boolean
  address?: WalletAddress
  user?: User
  setAddress: (address?: WalletAddress) => void
  setUser: (user?: User) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  address: undefined,
  user: undefined,
  setAddress: (address?: WalletAddress) => set({ address, isAuthenticated: !!address }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUser: (user?: User) => set({ user }),
}))

export default useAuthStore
