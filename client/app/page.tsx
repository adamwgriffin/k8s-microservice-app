'use client'

import { useState } from 'react'
import { FormEvent } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [user, setUser] = useState<{ name: string }>()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const res = await fetch('/api/users/currentuser')
    const data = await res.json()
    setUser(data)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Testing</h1>
        <h2>NEXT_PUBLIC enviroment variable added to build:</h2>
        <ul>
          <li>
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:{' '}
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          </li>
          <li>
            NEXT_PUBLIC_GOOGLE_MAPS_ID: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
          </li>
          <li>NEXT_PUBLIC_LOCALE: {process.env.NEXT_PUBLIC_LOCALE}</li>
          <li>NEXT_PUBLIC_CURRENCY: {process.env.NEXT_PUBLIC_CURRENCY}</li>
        </ul>
        <form onSubmit={onSubmit}>
          <button className='btn btn-primary'>Test Endpoint</button>
        </form>
        <p>Current User: {user?.name}</p>
      </main>
    </div>
  )
}
