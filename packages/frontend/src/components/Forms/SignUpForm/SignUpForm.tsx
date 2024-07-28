import type { FormEvent } from "react"
import React, { useRef, useState } from "react"
import EmailInput from "../../Inputs/Email/EmailInput"
import PasswordInput from "../../Inputs/Password/PasswordInput"
import { signUp } from "../../../features/auth/authThunks"
import { useAppDispatch } from "../../../app/hooks"
import UsernameInput from "../../Inputs/Username/UsernameInput"

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
    <form onSubmit={handleSubmit}>
      <EmailInput
        setIsEmailFullfilled={setIsEmailFullfilled}
        emailRef={emailRef}
      />
      <UsernameInput
        setIsUsernameFullfilled={setIsUsernameFullfilled}
        usernameRef={usernameRef}
      />
      <PasswordInput
        setIsPassFullfilled={setIsPassFullfilled}
        passRef={passRef}
      />
      <button
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
