import { useState } from "react"
import SignInForm from "../../components/Forms/SignInForm/SignInForm"
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm"
import LoginForm from "../../components/PureForms/LoginForm"

const HomePage = () => {
  const [isShowLogin, setShowLogin] = useState(false)
  const [isShowRegister, setShowRegister] = useState(false)

  if (isShowLogin) return <SignInForm />
  if (isShowRegister) return <SignUpForm />

  return (
    <>
      <div>Вы не авторизованы!!!</div>
      <button
        onClick={() => {
          setShowLogin(true)
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          setShowRegister(true)
        }}
      >
        Register
      </button>
    </>
  )
}

export default HomePage
