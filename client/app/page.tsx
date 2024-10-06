'use client'

import { FormEvent } from 'react'
import styles from './page.module.css'

export default function Home() {
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const res = await fetch('/api/users/currentuser')
    console.log(res)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Testing</h1>
        {/* <p>Hello, world! 🤘</p> */}
        <form onSubmit={onSubmit}>
          <button className='btn btn-primary'>
            Test Endpoint
          </button>
        </form>
      </main>
    </div>
  )
}
