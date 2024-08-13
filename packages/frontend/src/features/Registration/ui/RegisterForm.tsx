import type { FormEvent } from "react"
import React, { useRef, useState } from "react"
import { EmailInput } from "@shared/ui/Inputs"
import { PasswordInput } from "@shared/ui/Inputs"
import { UsernameInput } from "@shared/ui/Inputs"
import { signUp } from "../../auth/authThunks"
import { useAppDispatch } from "../../../app/hooks"
import { styles } from "@shared/ui/Forms"
const RegisterForm = () => {
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

export default RegisterForm
