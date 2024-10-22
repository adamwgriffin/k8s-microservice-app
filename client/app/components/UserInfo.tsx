'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../lib/auth'
import Logout from './Logout'

const UserInfo: React.FC = () => {
  const currentUser = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
  })

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
