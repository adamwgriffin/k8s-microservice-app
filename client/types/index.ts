export type CurrentUser = {
  _id: string
  email: string
}

export type CurrentUserResponse = {
  currentUser: CurrentUser
}
