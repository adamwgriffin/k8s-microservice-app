'use client'

import { FormEvent, useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useRegister } from '../../lib/auth'
import { useAppStore } from '../providers/AppStoreProvider'
import ContainedButton from './ContainedButton/ContainedButton'
import formStyles from '../styles/forms.module.css'
import styles from './login.module.css'

const RegisterForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: register, status, error, data } = useRegister()
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      register({ email, password })
    },
    [register, email, password]
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
        <h1>Register</h1>
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
          <ContainedButton>Register</ContainedButton>
        </div>
      </form>
      <p>
        Already have an account?{' '}
        <Link href={`/login${queryString}`}>Login</Link>
      </p>
      {error && <p>{error.message} </p>}
    </>
  )
}

export default RegisterForm
