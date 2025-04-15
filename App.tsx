import React from "react"
import { View } from "react-native"
import { NavigationIndependentTree } from "@react-navigation/native"
import AppNavigator from "@/navigation/AppNavigator"
import "@/i18n/config"
import WalletConnectProvider from "@/providers/WalletConnectProvider"
import useLoadingStore from "@/stores/loadingStore"
import Loading from "@/components/common/Loading"
import AuthProvider from "@/providers/auth/AuthProvider"
import useRefreshToken from "@/hooks/useRefreshToken"

export default function App() {
  const { isLoading } = useLoadingStore()
  const { appIsReady, onLayoutRootView } = useRefreshToken()

  if (!appIsReady) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <WalletConnectProvider>
        <>
          <AuthProvider>
            <NavigationIndependentTree>
              <AppNavigator />
            </NavigationIndependentTree>
          </AuthProvider>
          {isLoading && <Loading />}
        </>
      </WalletConnectProvider>
    </View>
  )
}
