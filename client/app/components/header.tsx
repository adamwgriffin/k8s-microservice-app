import Link from 'next/link'
import UserInfo from './UserInfo'
import styles from './header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>🐲</Link>
      </div>
      <nav className={styles.links}>
        <Link href='/about'>About</Link>
        <UserInfo />
      </nav>
    </header>
  )
}

export default Header
