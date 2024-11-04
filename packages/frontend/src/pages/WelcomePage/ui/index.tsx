import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { LoginForm } from '@features/Authorization'
import { RegisterForm } from '@features/Registration'
import { userModel } from '@entities/User'
import { useAppSelector } from '@shared/store'

const { isAuth } = userModel.selectors

export const WelcomePage = () => {
  const isAuthenticated = useAppSelector(isAuth)
  const [isShowLogin, setShowLogin] = useState(false)
  const [isShowRegister, setShowRegister] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace={true} />

  if (isShowLogin)
    return (
      <div className={styles.page}>
        <LoginForm />
      </div>
    )
  if (isShowRegister)
    return (
      <div className={styles.page}>
        <RegisterForm />
      </div>
    )

  return (
    <div className={styles.page}>
      <div>Вы не авторизованы!!!</div>
      <button
        className={styles.button}
        onClick={() => {
          setShowLogin(true)
        }}
      >
        Login
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setShowRegister(true)
        }}
      >
        Register
      </button>
    </div>
  )
}
