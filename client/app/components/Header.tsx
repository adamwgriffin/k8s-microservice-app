import Link from 'next/link'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { getCurrentUserQueryOptions } from '../../lib/auth'
import UserInfo from './UserInfo'
import styles from './Header.module.css'

const Header: React.FC = async () => {
  // Explanation for using a new QueryClient rather than existing one:
  // https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#alternative-use-a-single-queryclient-for-prefetching
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(getCurrentUserQueryOptions)
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>🐲</Link>
      </div>
      <nav className={styles.links}>
        <Link href='/about'>About</Link>
        {/* HydrationBoundary is a Client Component, so hydration will happen there. */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserInfo />
        </HydrationBoundary>
      </nav>
    </header>
  )
}

export default Header
