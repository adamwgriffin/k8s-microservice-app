'use client'

// Taken from React Query docs:
// https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#prefetching-and-dehydrating-data

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '../../lib/getQueryClient'

export default function ReactQueryClientProvider({
  children
}: {
  children: React.ReactNode
}) {
  // NOTE: Avoid useState when initializing the query client if you don't have a suspense boundary between this and the
  // code that may suspend because React will throw away the client on the initial render if it suspends and there is no
  // boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
