# Logger Utility

This utility provides a standardized way to log messages in the application. It only logs in development environments and supports tagging to identify which component or class is generating the logs.

## Features

- Only logs in development environments
- Supports different log levels (info, debug, warn, error, success)
- Supports tagging logs with class/component names
- Colorized output for better readability
- Ability to enable/disable specific tags

## Basic Usage

```typescript
import { logger } from "@/utils/logger"

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
```

## Creating Tagged Loggers

You can create loggers with specific tags to identify the source of logs:

```typescript
import Logger from "@/utils/logger"

// In a class or component
class UserService {
  private logger: Logger

  constructor() {
    // Create a logger with a tag to identify logs from this class
    this.logger = new Logger({ tag: "UserService" })
  }

  login(username: string) {
    this.logger.debug("Login attempt", { username })
    // ...
  }
}
```

## Using the Logger Factory Method

You can also create tagged loggers from the default instance:

```typescript
import { logger } from "@/utils/logger"

// In a class or component
class AuthController {
  private logger

  constructor() {
    // Create a logger from the default instance
    this.logger = logger.createLogger("AuthController")
  }

  authenticate(token: string) {
    this.logger.debug("Authenticating token", { tokenLength: token.length })
    // ...
  }
}
```

## Filtering Logs by Tag

You can filter logs to only show those from specific tags:

```typescript
import Logger, { logger } from "@/utils/logger"

// Set enabled tags - only logs from these tags will be shown
logger.setEnabledTags(["UserService", "AuthController"])

// Reset to show all tags
logger.setEnabledTags(null)
```

## Enabling/Disabling Logging

You can enable or disable logging globally:

```typescript
import { logger } from "@/utils/logger"

// Disable all logging
logger.setEnabled(false)

// Enable logging
logger.setEnabled(true)
```
