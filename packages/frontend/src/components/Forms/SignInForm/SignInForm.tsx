import React, { useRef, useState } from "react"
import type { FormEvent } from "react"
import EmailInput from "../../Inputs/Email/EmailInput"
import PasswordInput from "../../Inputs/Password/PasswordInput"
import { useAppDispatch } from "../../../app/hooks"
import { signIn } from "../../../features/auth/authThunks"
import styles from "../Form.module.css"

const LoginForm = () => {
  console.log("LoginForm render")
  const dispatch = useAppDispatch()

  const emailRef = useRef("")
  const [isEmailFullfilled, setIsEmailFullfilled] = useState(false)
  const passRef = useRef("")
  const [isPassFullfilled, setIsPassFullfilled] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await dispatch(
      signIn({ email: emailRef.current, password: passRef.current }),
    )
    setIsSubmitting(false)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Authorization</h2>
      <div className={styles.formGroup}>
        <EmailInput
          setIsEmailFullfilled={setIsEmailFullfilled}
          emailRef={emailRef}
        />
      </div>
      <div className={styles.formGroup}>
        <PasswordInput
          setIsPassFullfilled={setIsPassFullfilled}
          passRef={passRef}
        />
      </div>
      <button
        className={styles.button}
        type="submit"
        disabled={isSubmitting || !(isEmailFullfilled && isPassFullfilled)}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
