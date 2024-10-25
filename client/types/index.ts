export type CurrentUser = {
  id: string
  email: string
}

export type CurrentUserResponse = {
  currentUser: CurrentUser | null
}
