import { BASE_API_URL } from "@/config/env"
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios"
import Logger from "@/utils/logger"

// Create a logger instance for axios
const logger = new Logger({ tag: "Axios" })

// Extend InternalAxiosRequestConfig to include metadata for timing
declare module "axios" {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date
    }
  }
}

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.7",
    "content-type": "application/json",
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add timing metadata to track request duration
    config.metadata = { startTime: new Date() }

    // Format request data for better readability
    const requestInfo = {
      url: `${config.baseURL}${config.url}`,
      method: config.method?.toUpperCase(),
      headers: config.headers,
      params: config.params,
      data: config.data,
    }

    logger.info(`📡 REQUEST: ${config.method?.toUpperCase()} ${config.url}`, requestInfo)

    return config
  },
  (error: any) => {
    logger.error("❌ Request Failed", {
      message: error.message,
      stack: error.stack,
      config: error.config,
    })
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Calculate request duration
    const requestDuration = response.config?.metadata
      ? `${new Date().getTime() - response.config.metadata.startTime.getTime()}ms`
      : "unknown"

    // Format response data for better readability
    const responseInfo = {
      status: response.status,
      statusText: response.statusText,
      duration: requestDuration,
      headers: response.headers,
      data: response.data,
      size: JSON.stringify(response.data).length + " bytes",
    }

    logger.success(
      `✅ RESPONSE: ${response.status} ${response.config.url} (${requestDuration})`,
      responseInfo,
    )

    return response
  },
  (error: any) => {
    // Calculate request duration even for errors
    const requestDuration = error.config?.metadata
      ? `${new Date().getTime() - error.config.metadata.startTime.getTime()}ms`
      : "unknown"

    // Format error data for better readability
    const errorInfo = {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      duration: requestDuration,
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      message: error.message,
      stack: error.stack?.split("\n").slice(0, 3).join("\n"), // First 3 lines of stack trace
    }

    logger.error(
      `❌ FAILED: ${error.config?.method?.toUpperCase()} ${error.config?.url} (${requestDuration})`,
      errorInfo,
    )

    if (error.response?.status === 401) {
      logger.warn("⚠️ Authentication required", { redirectToLogin: true })
      // Handle unauthorized error (e.g., redirect to login)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
