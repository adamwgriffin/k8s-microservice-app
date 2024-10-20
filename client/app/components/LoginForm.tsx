'use client'

import type { CurrentUser } from '../../types'
import type { FormEvent } from 'react'
import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import ContainedButton from './ContainedButton/ContainedButton'
import formStyles from '../styles/forms.module.css'
import styles from './login.module.css'

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      try {
        await axios.post<CurrentUser>('/api/users/login', {
          email,
          password
        })
        router.push(searchParams.get('callbackUrl') || '/')
      } catch (error) {
        console.error(error)
      }
    },
    [email, password, router, searchParams]
  )

  const callbackUrl = searchParams.get('callbackUrl')
  const queryString = callbackUrl
    ? `?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : ''

  return (
    <>
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
      <p>
        Don&apos;t have an account?{' '}
        <Link href={`/register${queryString}`}>Register</Link>
      </p>
    </>
  )
}

export default LoginForm
