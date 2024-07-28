import { useState } from "react"
import SignInForm from "../../components/Forms/SignInForm/SignInForm"
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm"
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
        <SignUpForm />
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
