import { queryOptions } from '@tanstack/react-query'
import { CurrentUserResponse } from '../types'

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await fetch('/api/users/current_user')
  if (!response.ok) {
    throw new Error(`Network response was not ok. status: ${response.status}`)
  }
  return response.json()
}

export const getCurrentUserQueryOptions = queryOptions({
  queryKey: ['currentUser'],
  queryFn: getCurrentUser
})
