import type { FormEvent } from "react"
import React, { useRef, useState } from "react"
import EmailInput from "../../Inputs/Email/EmailInput"
import PasswordInput from "../../Inputs/Password/PasswordInput"
import { signUp } from "../../../features/auth/authThunks"
import { useAppDispatch } from "../../../app/hooks"
import UsernameInput from "../../Inputs/Username/UsernameInput"
import styles from "../Form.module.css"
const SignUpForm = () => {
  console.log("SignUpForm render")
  const dispatch = useAppDispatch()

  const emailRef = useRef("")
  const [isEmailFullfilled, setIsEmailFullfilled] = useState(false)

  const usernameRef = useRef("")
  const [isUsernameFullfilled, setIsUsernameFullfilled] = useState(false)

  const passRef = useRef("")
  const [isPassFullfilled, setIsPassFullfilled] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await dispatch(
      signUp({
        email: emailRef.current,
        username: usernameRef.current,
        password: passRef.current,
      }),
    )

    setIsSubmitting(false)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <div className={styles.formGroup}>
        <EmailInput
          setIsEmailFullfilled={setIsEmailFullfilled}
          emailRef={emailRef}
        />
      </div>
      <div className={styles.formGroup}>
        <UsernameInput
          setIsUsernameFullfilled={setIsUsernameFullfilled}
          usernameRef={usernameRef}
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
        disabled={
          isSubmitting ||
          !(isEmailFullfilled && isPassFullfilled && isUsernameFullfilled)
        }
      >
        Register
      </button>
    </form>
  )
}

export default SignUpForm
