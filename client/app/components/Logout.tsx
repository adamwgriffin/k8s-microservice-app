'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useLogout } from '../../lib/auth'
import { useAppStore } from '../providers/AppStoreProvider'

const Logout: React.FC = () => {
  const router = useRouter()
  const { mutate: logout, status } = useLogout()
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)

  const handleLogout = useCallback(
    async (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      logout()
    },
    [logout]
  )

  useEffect(() => {
    if (status === 'success') {
      setCurrentUser(null)
      router.push('/')
    }
  }, [status, setCurrentUser, router])

  return (
    <Link href='/logout' onClick={handleLogout}>
      Log Out
    </Link>
  )
}

export default Logout
