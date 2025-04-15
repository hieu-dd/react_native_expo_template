import { QueryClient, type QueryFunction, UseQueryOptions, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"
import Logger from "@/utils/logger"

// Create a logger instance for query operations
const logger = new Logger({ tag: "Query" })

export const buildQueryOptions = <T>(fn: QueryFunction<T>) => ({
  queryKey: [fn.name],
  queryFn: fn,
})

export const queryClient = new QueryClient()

export const useQueryWithErrorHandling = <T>(options: UseQueryOptions<T>) => {
  // TODO - handleError should be a custom hook that handles errors
  // and shows a toast or some other UI element
  const handleError = useCallback((error: unknown) => {
    logger.error("Query error", error)
    // TODO - show a toast or some other UI element
  }, [])
  const { data, isLoading, isFetching, error, refetch } = useQuery<T>(options)

  useEffect(() => {
    if (error && !isFetching && !isLoading) {
      handleError(error)
    }
  }, [error, isFetching, isLoading, handleError])

  return { data, isLoading, isFetching, error, refetch }
}
