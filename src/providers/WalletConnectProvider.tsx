import "@walletconnect/react-native-compat"
import { http, WagmiProvider } from "wagmi"
import {
  mainnet,
  polygon,
  arbitrum,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  goerli,
  linea,
} from "@wagmi/core/chains"
import { QueryClientProvider } from "@tanstack/react-query"
import { createAppKit, defaultWagmiConfig, AppKit } from "@reown/appkit-wagmi-react-native"
import React from "react"
import { PROVIDER_CHAIN_ID, WALLET_CONNECT_PROJECT_ID } from "@/config/env"
import { queryClient } from "@/config/queryClient"
import { defineChain } from "viem"
import Constants from "expo-constants"

const projectId = WALLET_CONNECT_PROJECT_ID

// 2. Create config
const metadata = {
  name: "AppKit RN",
  description: "AppKit RN Example",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: Constants.executionEnvironment ? `exp://${Constants?.expoConfig?.hostUri}` : "",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
}

export const bscTestnetChain = defineChain({
  ...bscTestnet,
  rpcUrls: {
    default: {
      http: [
        "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
        "https://bsc-testnet-dataseed.bnbchain.org",
        "https://bsc-testnet.bnbchain.org",
        "https://bsc-prebsc-dataseed.bnbchain.org",
        ...bscTestnet.rpcUrls.default.http,
      ],
    },
  },
})

export const bscMainnetChain = defineChain({
  ...bsc,
  rpcUrls: {
    default: {
      http: [
        "https://rpc.ankr.com/bsc",
        "https://bsc-dataseed.bnbchain.org",
        "https://bsc-dataseed1.bnbchain.org",
        "https://bsc-dataseed2.bnbchain.org",
        "https://bsc-dataseed3.bnbchain.org",
        "https://bsc-dataseed4.bnbchain.org",
        "https://bsc-dataseed.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed1.binance.org",
        ...bsc.rpcUrls.default.http,
      ],
    },
  },
})

export const appChains = [
  bscTestnetChain,
  bscMainnetChain,
  mainnet,
  goerli,
  linea,
  arbitrum,
  baseSepolia,
  polygon,
  base,
] as const

export const activeChain =
  appChains.find((chain) => chain.id === PROVIDER_CHAIN_ID) || bscTestnetChain

export const wagmiConfig = defaultWagmiConfig({
  chains: appChains,
  projectId,
  metadata,
  transports: {
    [bscTestnetChain.id]: http(),
    [bscMainnetChain.id]: http(),
  },
})

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: activeChain, // Optional
})

const WalletConnectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default WalletConnectProvider
