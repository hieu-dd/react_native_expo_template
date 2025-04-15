import AsyncStorage from "@react-native-async-storage/async-storage"
import { updateAuthToken } from "@/service/tokenManager"
import Logger from "./logger"

// Create a logger instance for storage operations
const logger = new Logger({ tag: "Storage" })

/**
 * Storage keys used in the application
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "@auth_token",
  REFRESH_TOKEN: "@refresh_token",
  USER_DATA: "@user_data",
  LANGUAGE: "@language",
  THEME: "@theme",
  ONBOARDING_COMPLETED: "@onboarding_completed",
}

/**
 * Store string data in AsyncStorage
 * @param key Storage key
 * @param value Value to store
 */
export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    logger.error(`Error storing data for key ${key}`, error)
  }
}

/**
 * Store object data in AsyncStorage
 * @param key Storage key
 * @param value Object to store
 */
export const storeObjectData = async (key: string, value: object): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (error) {
    logger.error(`Error storing object data for key ${key}`, error)
  }
}

/**
 * Get string data from AsyncStorage
 * @param key Storage key
 * @returns The stored string or null if not found
 */
export const getData = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (error) {
    logger.error(`Error getting data for key ${key}`, error)
    return null
  }
}

/**
 * Get object data from AsyncStorage
 * @param key Storage key
 * @returns The stored object or null if not found
 */
export const getObjectData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null
  } catch (error) {
    logger.error(`Error getting object data for key ${key}`, error)
    return null
  }
}

/**
 * Remove data from AsyncStorage
 * @param key Storage key
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    logger.error(`Error removing data for key ${key}`, error)
  }
}

/**
 * Remove multiple items from AsyncStorage
 * @param keys Array of storage keys
 */
export const removeMultipleData = async (keys: string[]): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(keys)
  } catch (error) {
    logger.error("Error removing multiple data", error)
  }
}

/**
 * Clear all data from AsyncStorage
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    logger.error("Error clearing all data", error)
  }
}

/**
 * Get all keys stored in AsyncStorage
 * @returns Array of keys or empty array if error
 */
export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    return await AsyncStorage.getAllKeys()
  } catch (error) {
    logger.error("Error getting all keys", error)
    return []
  }
}

/**
 * Store auth tokens
 * @param token Auth token
 * @param refreshToken Refresh token (optional)
 */
export const storeAuthTokens = async (token: string, refreshToken?: string): Promise<void> => {
  await storeData(STORAGE_KEYS.AUTH_TOKEN, token)
  if (refreshToken) {
    await storeData(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  }
  // Update axios auth header when token changes
  updateAuthToken(token)
}

/**
 * Get auth token
 * @returns The auth token or null if not found
 */
export const getAuthToken = async (): Promise<string | null> => {
  return await getData(STORAGE_KEYS.AUTH_TOKEN)
}

/**
 * Clear auth tokens
 */
export const clearAuthTokens = async (): Promise<void> => {
  await removeMultipleData([STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.REFRESH_TOKEN])
  // Reset axios auth header when tokens are cleared
  updateAuthToken(null)
}
