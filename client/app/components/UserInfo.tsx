'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUserQueryOptions } from '../../lib/auth'
import Logout from './Logout'

const UserInfo: React.FC = () => {
  // This useQuery could just as well happen in some deeper child to <UserInfo>, data will be available immediately
  // either way. Note that we are using useQuery here instead of useSuspenseQuery. Because this data has already been
  // prefetched, there is no need to ever suspend in the component itself. If we forget or remove the prefetch, this
  // will instead fetch the data on the client, while using useSuspenseQuery would have had worse side effects.
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
      {currentUser && <Link href='/account'>Account</Link>}
      {currentUser && <Logout />}
    </>
  )
}

export default UserInfo
