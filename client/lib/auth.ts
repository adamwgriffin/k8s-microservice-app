import { queryOptions } from '@tanstack/react-query'
import { CurrentUserResponse } from '../types'

export async function getCurrentUser(): Promise<
  CurrentUserResponse['currentUser']
> {
  const response = await fetch('/api/users/current_user')
  if (!response.ok) {
    throw new Error(`Network response was not ok. status: ${response.status}`)
  }
  const data = (await response.json()) as CurrentUserResponse
  return data.currentUser
}

export const getCurrentUserQueryOptions = queryOptions({
  queryKey: ['currentUser'],
  queryFn: getCurrentUser
})
