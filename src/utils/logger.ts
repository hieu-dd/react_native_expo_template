/**
 * Logger utility class for application-wide logging
 * Only logs in development environment and supports tagging for easier debugging
 */

// Log levels with corresponding colors
const LOG_LEVELS = {
  INFO: {
    label: "INFO",
    color: "\x1b[34m%s\x1b[0m", // Blue
    emoji: "ℹ️",
  },
  DEBUG: {
    label: "DEBUG",
    color: "\x1b[36m%s\x1b[0m", // Cyan
    emoji: "🔍",
  },
  WARN: {
    label: "WARN",
    color: "\x1b[33m%s\x1b[0m", // Yellow
    emoji: "⚠️",
  },
  ERROR: {
    label: "ERROR",
    color: "\x1b[31m%s\x1b[0m", // Red
    emoji: "❌",
  },
  SUCCESS: {
    label: "SUCCESS",
    color: "\x1b[32m%s\x1b[0m", // Green
    emoji: "✅",
  },
}

type LogLevel = keyof typeof LOG_LEVELS

interface LoggerOptions {
  enabled?: boolean
  tag?: string
  enabledTags?: string[]
}

/**
 * Logger class for consistent logging throughout the application
 */
class Logger {
  private static instance: Logger
  private enabled: boolean
  private tag: string
  private enabledTags: string[] | null

  /**
   * Create a new Logger instance
   * @param options Logger configuration options
   */
  constructor(options: LoggerOptions = {}) {
    // Only enable logging in development environment
    this.enabled = options.enabled ?? process.env.NODE_ENV !== "production"
    this.tag = options.tag ?? ""
    this.enabledTags = options.enabledTags ?? null
  }

  /**
   * Get singleton instance of Logger
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  /**
   * Create a new logger with a specific tag
   * @param tag Tag to identify the source of logs
   * @returns A new Logger instance with the specified tag
   */
  public createLogger(tag: string): Logger {
    return new Logger({
      enabled: this.enabled,
      tag,
      enabledTags: this.enabledTags,
    })
  }

  /**
   * Set enabled tags - only logs from these tags will be shown
   * @param tags Array of tags to enable, or null to show all tags
   */
  public setEnabledTags(tags: string[] | null): void {
    this.enabledTags = tags
  }

  /**
   * Enable or disable logging
   * @param enabled Whether logging should be enabled
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  /**
   * Check if this logger should log based on current configuration
   */
  private shouldLog(): boolean {
    if (!this.enabled) return false
    if (!this.enabledTags) return true
    if (!this.tag) return true
    return this.enabledTags.includes(this.tag)
  }

  /**
   * Format the log message with tag if present
   */
  private formatMessage(message: string, level: LogLevel): string {
    const { label, emoji } = LOG_LEVELS[level]
    const tagPart = this.tag ? `[${this.tag}]` : ""
    return `${emoji} ${label} ${tagPart} ${message}`
  }

  /**
   * Log an informational message
   * @param message Message to log
   * @param data Optional data to log
   */
  public info(message: string, data?: any): void {
    if (!this.shouldLog()) return
    const formattedMessage = this.formatMessage(message, "INFO")

    if (data) {
      console.group(LOG_LEVELS.INFO.color, formattedMessage)
      console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    } else {
      console.log(LOG_LEVELS.INFO.color, formattedMessage)
    }
  }

  /**
   * Log a debug message
   * @param message Message to log
   * @param data Optional data to log
   */
  public debug(message: string, data?: any): void {
    if (!this.shouldLog()) return
    const formattedMessage = this.formatMessage(message, "DEBUG")

    if (data) {
      console.group(LOG_LEVELS.DEBUG.color, formattedMessage)
      console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    } else {
      console.log(LOG_LEVELS.DEBUG.color, formattedMessage)
    }
  }

  /**
   * Log a warning message
   * @param message Message to log
   * @param data Optional data to log
   */
  public warn(message: string, data?: any): void {
    if (!this.shouldLog()) return
    const formattedMessage = this.formatMessage(message, "WARN")

    if (data) {
      console.group(LOG_LEVELS.WARN.color, formattedMessage)
      console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    } else {
      console.log(LOG_LEVELS.WARN.color, formattedMessage)
    }
  }

  /**
   * Log an error message
   * @param message Message to log
   * @param data Optional data to log
   */
  public error(message: string, data?: any): void {
    if (!this.shouldLog()) return
    const formattedMessage = this.formatMessage(message, "ERROR")

    if (data) {
      console.group(LOG_LEVELS.ERROR.color, formattedMessage)
      console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    } else {
      console.log(LOG_LEVELS.ERROR.color, formattedMessage)
    }
  }

  /**
   * Log a success message
   * @param message Message to log
   * @param data Optional data to log
   */
  public success(message: string, data?: any): void {
    if (!this.shouldLog()) return
    const formattedMessage = this.formatMessage(message, "SUCCESS")

    if (data) {
      console.group(LOG_LEVELS.SUCCESS.color, formattedMessage)
      console.dir(data, { depth: null, colors: true })
      console.groupEnd()
    } else {
      console.log(LOG_LEVELS.SUCCESS.color, formattedMessage)
    }
  }

  /**
   * Log a message with a custom level
   * @param level Log level
   * @param message Message to log
   * @param data Optional data to log
   */
  public log(level: LogLevel, message: string, data?: any): void {
    switch (level) {
      case "INFO":
        this.info(message, data)
        break
      case "DEBUG":
        this.debug(message, data)
        break
      case "WARN":
        this.warn(message, data)
        break
      case "ERROR":
        this.error(message, data)
        break
      case "SUCCESS":
        this.success(message, data)
        break
    }
  }
}

// Export a default logger instance for easy use
export const logger = Logger.getInstance()

// Export the Logger class for creating tagged loggers
export default Logger
