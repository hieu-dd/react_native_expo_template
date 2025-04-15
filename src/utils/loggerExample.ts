import Logger, { logger } from "./logger"

/**
 * This file demonstrates how to use the Logger class
 * It's not meant to be used in production, just for reference
 */

// Example 1: Using the default logger
export function loggerExample1() {
  // Basic logging
  logger.info("This is an info message")
  logger.debug("This is a debug message")
  logger.warn("This is a warning message")
  logger.error("This is an error message")
  logger.success("This is a success message")

  // Logging with data
  logger.info("User logged in", { userId: "123", timestamp: new Date() })
  logger.error("API request failed", {
    url: "https://api.example.com/data",
    status: 404,
    message: "Not found",
  })
}

// Example 2: Creating a tagged logger for a specific component or class
export class UserService {
  private logger: Logger

  constructor() {
    // Create a logger with a tag to identify logs from this class
    this.logger = new Logger({ tag: "UserService" })
  }

  login(username: string, password: string) {
    this.logger.debug("Login attempt", { username })

    // Simulate login logic
    if (username === "admin" && password === "password") {
      this.logger.success("Login successful", { username })
      return true
    } else {
      this.logger.error("Login failed", { username, reason: "Invalid credentials" })
      return false
    }
  }

  getUserProfile(userId: string) {
    this.logger.info(`Fetching profile for user ${userId}`)

    // Simulate API call
    this.logger.debug("API request", {
      method: "GET",
      url: `/api/users/${userId}`,
    })

    // Simulate response
    return {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
    }
  }
}

// Example 3: Using the logger factory method
export class AuthController {
  private logger: Logger

  constructor() {
    // Create a logger from the default instance
    this.logger = logger.createLogger("AuthController")
  }

  authenticate(token: string) {
    this.logger.debug("Authenticating token", { tokenLength: token.length })

    // Simulate token validation
    if (token.length > 10) {
      this.logger.success("Token is valid")
      return true
    } else {
      this.logger.warn("Token is too short", { tokenLength: token.length })
      return false
    }
  }
}

// Example 4: Filtering logs by tag
export function filterLogsByTag() {
  // Create the default logger
  const defaultLogger = Logger.getInstance()

  // Set enabled tags - only logs from these tags will be shown
  defaultLogger.setEnabledTags(["UserService", "AuthController"])

  // Create instances with different tags
  const userLogger = new Logger({ tag: "UserService" })
  const authLogger = new Logger({ tag: "AuthController" })
  const apiLogger = new Logger({ tag: "APIService" })

  // These logs will be shown because their tags are enabled
  userLogger.info("User service initialized")
  authLogger.info("Auth controller initialized")

  // This log will be hidden because its tag is not in the enabled list
  apiLogger.info("API service initialized")

  // Reset to show all tags
  defaultLogger.setEnabledTags(null)
}
