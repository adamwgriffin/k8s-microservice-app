import axios from 'axios'
import { CurrentUserResponse } from '../types'

export async function getCurrentUser() {
  const { data } = await axios.get<CurrentUserResponse>(
    '/api/users/current_user'
  )
  return data.currentUser
}
