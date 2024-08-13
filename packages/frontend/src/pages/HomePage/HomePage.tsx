import { useState } from "react"
import SignInForm from "../../features/Authorization/ui/LoginForm"
import RegisterForm from "../../features/Registration/ui/RegisterForm"
import styles from "./HomePage.module.css"

const HomePage = () => {
  const [isShowLogin, setShowLogin] = useState(false)
  const [isShowRegister, setShowRegister] = useState(false)

  if (isShowLogin)
    return (
      <div className={styles.page}>
        <SignInForm />
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

export default HomePage
