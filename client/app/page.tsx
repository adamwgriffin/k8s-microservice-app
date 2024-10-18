import type { CurrentUserResponse } from '../types'
import buildClient from '../lib/build_client'
import Header from './components/header'
import styles from './page.module.css'
import { headers } from 'next/headers'

export default async function Home() {
  let data: CurrentUserResponse = { currentUser: null }

  const client = buildClient(headers())

  try {
    const response = await client.get<CurrentUserResponse>(
      '/api/users/current_user'
    )
    data = response.data
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <Header currentUser={data.currentUser} />
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
        {data.currentUser ? (
          <p>Current User: {data.currentUser.email}</p>
        ) : (
          <p>Not logged in</p>
        )}
      </main>
    </>
  )
}
