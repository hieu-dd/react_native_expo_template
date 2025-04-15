import { useEffect, useState, useCallback } from "react"
import useAuthStore from "@/stores/authStore"
import { refreshTokenApi } from "@/service"
import * as SplashScreen from "expo-splash-screen"
import { getData, STORAGE_KEYS } from "@/utils/storage"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

const useRefreshToken = () => {
  const { setIsAuthenticated } = useAuthStore()
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    const handleTokenRefresh = async () => {
      try {
        // Get refresh token from storage using utility function
        const storedRefreshToken = await getData(STORAGE_KEYS.REFRESH_TOKEN)

        if (!storedRefreshToken) {
          setIsAuthenticated(false)
          return
        }

        // Use the existing refreshToken function from service
        const success = await refreshTokenApi(storedRefreshToken)

        if (success) {
          // Update authentication state
          setIsAuthenticated(true)
        } else {
          // If refresh failed, set not authenticated
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Token refresh failed:", error)
        setIsAuthenticated(false)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    handleTokenRefresh()
  }, [setIsAuthenticated])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  return { appIsReady, onLayoutRootView }
}

export default useRefreshToken
