import type { CurrentUser } from '../../types'
import Link from 'next/link'
import Logout from './logout'
import styles from './header.module.css'

export type HeaderProps = {
  currentUser: CurrentUser
}

const Header: React.FC<HeaderProps> = ({ currentUser = null }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🐲</div>
      <nav className={styles.links}>
        {!currentUser && <Link href='/register'>Register</Link>}
        {!currentUser && <Link href='/login'>Login</Link>}
        {currentUser && <Logout />}
      </nav>
    </header>
  )
}

export default Header
