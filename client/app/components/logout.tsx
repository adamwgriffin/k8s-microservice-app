'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import axios from 'axios'

const Logout: React.FC = () => {
  const router = useRouter()

  const handleLogout = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      await axios.post('/api/users/logout')
      router.push('/')
      router.refresh()
    },
    [router]
  )

  return (
    <Link href='/logout' onClick={handleLogout}>
      Log Out
    </Link>
  )
}

export default Logout
