'use client'

import type { CurrentUser } from '../../types'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import ContainedButton from '../components/ContainedButton/ContainedButton'
import formStyles from '../styles/forms.module.css'
import styles from '../styles/login.module.css'

const Login: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await axios.post<CurrentUser>('/api/users/login', {
        email,
        password
      })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className={formStyles.inputGroup}>
          <label htmlFor='email' className={formStyles.label}>
            Email Address
          </label>
          <input
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={formStyles.input}
          />
        </div>
        <div className={formStyles.inputGroup}>
          <label htmlFor='password' className={formStyles.label}>
            Password
          </label>
          <input
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className={formStyles.input}
          />
        </div>
        <div className={styles.footer}>
          <ContainedButton>Login</ContainedButton>
        </div>
      </form>
      {/* TODO: Add callcback param to register link*/}
      <p>Don&apos;t have an account? <Link href='/register'>Login</Link></p>
    </div>
  )
}

export default Login
