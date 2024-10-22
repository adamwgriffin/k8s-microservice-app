import Link from 'next/link'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { getCurrentUser } from '../../lib/auth'
import UserInfo from './UserInfo'
import styles from './Header.module.css'

const Header: React.FC = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser
  })
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>🐲</Link>
      </div>
      <nav className={styles.links}>
        <Link href='/about'>About</Link>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserInfo />
        </HydrationBoundary>
      </nav>
    </header>
  )
}

export default Header
