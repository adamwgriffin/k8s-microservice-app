import styles from './MainLayout.module.css'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.mainLayout}>
      {children}
    </div>
  )
}
