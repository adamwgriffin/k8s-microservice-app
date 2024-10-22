'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUserQueryOptions } from '../../lib/auth'
import Logout from './Logout'

const UserInfo: React.FC = () => {
  const {
    isFetching,
    data: currentUser,
    error
  } = useQuery(getCurrentUserQueryOptions)

  if (isFetching) {
    return <>Loading...</>
  }

  if (error) {
    return (
      <>
        <Link href='/register'>Register</Link>
        <Link href='/login'>Login</Link>
      </>
    )
  }

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
