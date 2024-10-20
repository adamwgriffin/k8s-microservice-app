'use client'

import type { CurrentUserResponse } from '../../types'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Logout from './Logout'

const UserInfo: React.FC = () => {
  const [currentUser, setCurrentUser] =
    useState<CurrentUserResponse['currentUser']>(null)

  // TODO: Look into a better solution. Getting the session from the server instead of the client doesn't work well
  // because the header uses this component in the layout and it being a client component makes it so that every page is
  // dynamically rendered instead of statically rendered. This isn't good for performance and TTFB. Putting this request
  // inside of useEffect has it's own problems. Using React Query or SWR is supposed to be a better solution. Also, we
  // could try passing the response from current_user that we already got from the request that runs in middleware by
  // rewriting the url with query params or adding headers that contain the response data. We might looking into putting
  // this inside of a suspense boundary as well.
  useEffect(() => {
    async function getSession() {
      const { data } = await axios.get<CurrentUserResponse>(
        '/api/users/current_user'
      )
      setCurrentUser(data.currentUser)
    }
    getSession()
  }, [])

  return (
    <>
      {!currentUser && <Link href='/register'>Register</Link>}
      {!currentUser && <Link href='/login'>Login</Link>}
      {currentUser && <Link href='/admin'>Admin</Link>}
      {currentUser && <Logout />}
    </>
  )
}

export default UserInfo
