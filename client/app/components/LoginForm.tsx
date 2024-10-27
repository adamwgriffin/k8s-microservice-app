'use client'

import type { FormEvent } from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLogin } from '../../lib/auth'
import { useAppStore } from '../providers/AppStoreProvider'
import ContainedButton from './ContainedButton/ContainedButton'
import formStyles from '../styles/forms.module.css'
import styles from './login.module.css'

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login, status, error, data } = useLogin()
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      login({ email, password })
    },
    [login, email, password]
  )

  useEffect(() => {
    if (status === 'success') {
      setCurrentUser(data)
      router.push(searchParams.get('callbackUrl') || '/')
    }
  }, [data, error, status, setCurrentUser, router, searchParams])

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
            autoComplete='off'
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
            autoComplete='off'
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
      {error && <p>{error.message} </p>}
    </>
  )
}

export default LoginForm
