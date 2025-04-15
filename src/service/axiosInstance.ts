import { BASE_API_URL } from "@/config/env"
import axios from "axios"

// Debug configuration
const DEBUG = {
  enabled: process.env.NODE_ENV !== "production",
  colors: {
    request: "\x1b[34m%s\x1b[0m", // Blue
    response: "\x1b[32m%s\x1b[0m", // Green
    error: "\x1b[31m%s\x1b[0m", // Red
    warning: "\x1b[33m%s\x1b[0m", // Yellow
  },
}

// Logger utility
const logger = {
  request: (message: string, data?: any) => {
    if (DEBUG.enabled) {
      console.group(DEBUG.colors.request, `🔽 REQUEST: ${message}`)
      if (data) console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    }
  },
  response: (message: string, data?: any) => {
    if (DEBUG.enabled) {
      console.group(DEBUG.colors.response, `🔼 RESPONSE: ${message}`)
      if (data) console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    }
  },
  error: (message: string, data?: any) => {
    if (DEBUG.enabled) {
      console.group(DEBUG.colors.error, `❌ ERROR: ${message}`)
      if (data) console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    }
  },
  warning: (message: string, data?: any) => {
    if (DEBUG.enabled) {
      console.group(DEBUG.colors.warning, `⚠️ WARNING: ${message}`)
      if (data) console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    }
  },
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
  (config) => {
    logger.request(`${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      params: config.params,
      data: config.data,
      baseURL: config.baseURL,
    })

    return config
  },
  (error) => {
    logger.error("Request Failed", error)
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    logger.response(`${response.status} ${response.config.url}`, {
      data: response.data,
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    })

    return response
  },
  (error) => {
    const requestDuration = error.config?.metadata
      ? `${new Date().getTime() - error.config.metadata.startTime.getTime()}ms`
      : "unknown"

    logger.error(
      `Failed ${error.config?.method?.toUpperCase()} ${error.config?.url} (${requestDuration})`,
      {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      },
    )

    if (error.response?.status === 401) {
      logger.warning("Authentication required", { redirectToLogin: true })
      // Handle unauthorized error (e.g., redirect to login)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
