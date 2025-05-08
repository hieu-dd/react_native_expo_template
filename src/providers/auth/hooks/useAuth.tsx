import { PROVIDER_CHAIN_ID } from "@/config/env"
import { appChains } from "@/providers/WalletConnectProvider"
import { getNonceApi, getProfileApi, loginApi } from "@/service"
import useAuthStore from "@/stores/authStore"
import { WalletAddress } from "@/types/index.types"
import Logger from "@/utils/logger"
import { useAppKitState } from "@reown/appkit-wagmi-react-native"
import { useCallback, useEffect } from "react"
import { useAccount, useSignMessage, useSwitchChain } from "wagmi"

// Create a logger instance for auth operations
const logger = new Logger({ tag: "Auth" })

export const WELCOME_MESSAGE = (address: string, nonce: string) =>
  `Welcome to Briky Land!

Click to sign in and accept the Briky Land Terms of Service (https://brikyland.com/tos) and Privacy Policy (https://brikyland.com/privacy).

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${address}

Nonce:
${nonce}`

export const useAuth = () => {
  const { address } = useAccount()
  const authStore = useAuthStore()
  const { selectedNetworkId } = useAppKitState()
  const { switchChainAsync } = useSwitchChain()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    if (!authStore.isAuthenticated && address) {
      onHannelConnect(address)
    }
    if (!address) {
      authStore.setAddress(undefined)
      return
    }
    if (authStore.isAuthenticated) {
      authStore.setAddress(address as WalletAddress)
      return
    }
    onHannelConnect(address)
  }, [address, authStore.isAuthenticated])

  const needSwitchNetwork = !appChains.find((chain) => chain.id === selectedNetworkId)

  const handleSwitchNetwork = useCallback(async () => {
    try {
      const result = await switchChainAsync({ chainId: PROVIDER_CHAIN_ID })
      if (result.id !== PROVIDER_CHAIN_ID) {
        throw new Error(result.name)
      }
      return true
    } catch {
      return false
    }
  }, [switchChainAsync])

  const handleSignMessage = useCallback(
    async (walletAddress: string) => {
      try {
        // Get nonce and sign message
        const nonce = await getNonceApi(walletAddress)
        const signature = await signMessageAsync({
          message: WELCOME_MESSAGE(walletAddress, nonce),
        })
        const result = await loginApi(walletAddress, nonce, signature)
        if (result) {
          const user = await getProfileApi(walletAddress)
          authStore.setAddress(walletAddress as WalletAddress)
          authStore.setUser(user)
        }
      } catch (error) {
        logger.error("Sign message failed", error)
      } finally {
        logger.debug("Finished handleSignMessage")
        if (selectedNetworkId !== PROVIDER_CHAIN_ID) {
          await handleSwitchNetwork()
        }
      }
    },
    [authStore, handleSwitchNetwork, selectedNetworkId, signMessageAsync],
  )

  const onHannelConnect = useCallback(
    async (walletAddress: string) => {
      if (needSwitchNetwork) {
        const result = await handleSwitchNetwork()
        if (result) {
          logger.success("Switch network successful")
        } else {
          logger.warn("Switch network failed")
        }
      } else {
        await handleSignMessage(walletAddress)
      }
    },
    [handleSignMessage, handleSwitchNetwork, needSwitchNetwork],
  )
}
