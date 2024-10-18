import type { CurrentUser } from '../../types'
import Link from 'next/link'
import Logout from './logout'
import styles from './header.module.css'

export type HeaderProps = {
  currentUser: CurrentUser | null
}

const Header: React.FC<HeaderProps> = ({ currentUser = null }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🐲</div>
      <nav className={styles.links}>
        <Link href='/about'>About</Link>
        {!currentUser && <Link href='/register'>Register</Link>}
        {!currentUser && <Link href='/login'>Login</Link>}
        {currentUser && <Link href='/admin'>Admin</Link>}
        {currentUser && <Logout />}
      </nav>
    </header>
  )
}

export default Header
