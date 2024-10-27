import type { CurrentUserResponse } from '../types'
import { createStore } from 'zustand/vanilla'

export type AppState = {
  currentUser: CurrentUserResponse['currentUser'] | undefined
}

export type AppActions = {
  setCurrentUser: (user: CurrentUserResponse['currentUser']) => void
}

export type AppStore = AppState & AppActions

export const defaultInitState: AppState = {
  currentUser: undefined
}

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    setCurrentUser: (user) => set({ currentUser: user })
  }))
}
