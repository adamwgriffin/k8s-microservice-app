import type { CurrentUser, CurrentUserResponse } from '../types'
import { jwtVerify } from 'jose'
import { queryOptions } from '@tanstack/react-query'

export const ProtectedRoutes = Object.freeze([
  /^\/admin(\/.*)?$/,
  /^\/account(\/.*)?$/
])

export function isProtectedRoute(pathname: string) {
  return ProtectedRoutes.some((r) => r.test(pathname))
}

export type Session = {
  jwt: string
  _expire: number
  _maxAge: number
}

const key = new TextEncoder().encode(process.env.JWT_SECRET)

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

export function decodeSession(session: string): DecodedSession {
  return JSON.parse(atob(session))
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify<CurrentUser>(input, key)
  return payload
}

export async function getCurrentUserFromSession(session: string | undefined) {
  if (!session) return
  try {
    const decodedSession = decodeSession(session)
    return await decrypt(decodedSession.jwt)
  } catch (error) {
    console.error('Error decrypting session:', error)
  }
}
