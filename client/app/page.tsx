import styles from './page.module.css'

export default async function Home() {
  return (
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
        <li>
          NEXT_PUBLIC_INGRESS_HOSTNAME:{' '}
          {process.env.NEXT_PUBLIC_INGRESS_HOSTNAME}
        </li>
      </ul>
      {/* <pre>{JSON.stringify(data)}</pre> */}
    </main>
  )
}
