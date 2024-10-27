import type { CurrentUser, CurrentUserResponse } from '../types'
import { jwtVerify } from 'jose'
import { queryOptions, useQuery, useMutation } from '@tanstack/react-query'

export type Session = {
  jwt: string
  _expire: number
  _maxAge: number
}

export type Credentials = {
  email: string
  password: string
}

export const ProtectedRoutes = Object.freeze([
  /^\/admin(\/.*)?$/,
  /^\/account(\/.*)?$/
])

export function isProtectedRoute(pathname: string) {
  return ProtectedRoutes.some((r) => r.test(pathname))
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

export function useGetCurrentUser() {
  return useQuery(getCurrentUserQueryOptions)
}

export async function loginUser({
  email,
  password
}: Credentials): Promise<CurrentUserResponse['currentUser']> {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!response.ok) {
    throw new Error(`Error logging in. Status: ${response.status}`)
  }
  return response.json()
}

export function useLogin() {
  return useMutation({ mutationFn: loginUser })
}

export async function registerUser({
  email,
  password
}: Credentials): Promise<CurrentUserResponse['currentUser']> {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!response.ok) {
    throw new Error(`Error registering user. Status: ${response.status}`)
  }
  return response.json()
}

export function useRegister() {
  return useMutation({ mutationFn: registerUser })
}

export async function logoutUser(): Promise<
  CurrentUserResponse['currentUser']
> {
  const response = await fetch('/api/users/logout', {
    method: 'POST'
  })
  if (!response.ok) {
    throw new Error(`Error logging out user. Status: ${response.status}`)
  }
  return response.json()
}

export function useLogout() {
  return useMutation({ mutationFn: logoutUser })
}

export function decodeSession(session: string): Session {
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
