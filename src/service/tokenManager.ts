/**
 * Token manager service
 * Simple token management without listeners
 */

import axiosInstance from "./axiosInstance"

/**
 * Update the stored auth token
 * @param token The new auth token or null when clearing
 */
export const updateAuthToken = (token: string | null): void => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    // Remove Authorization header when token is cleared
    delete axiosInstance.defaults.headers.common.Authorization
  }
}
