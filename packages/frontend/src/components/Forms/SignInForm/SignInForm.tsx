import React, { useRef, useState } from "react"
import type { FormEvent } from "react"
import EmailInput from "../../Inputs/Email/EmailInput"
import PasswordInput from "../../Inputs/Password/PasswordInput"
import { useAppDispatch } from "../../../app/hooks"
import { signIn } from "../../../features/auth/authThunks"

const LoginForm = () => {
  const dispatch = useAppDispatch()
  /* const [emailInputValue, setEmailInputValue] = useState("")
  const [emailInputError, setEmailInputError] = useState("") */

  const emailRef = useRef("")
  const [isEmailFullfilled, setIsEmailFullfilled] = useState(false)
  const passRef = useRef("")
  const [isPassFullfilled, setIsPassFullfilled] = useState(false)

  /* const [passwordInputValue, setPasswordInputValue] = useState("")
  const [passwordInputError, setPasswordInputError] = useState("") */

  const [isSubmitting, setIsSubmitting] = useState(false)

  /* const isThereInputsErrors =
    emailInputError === "" && passwordInputError === "" ? false : true
  const isSomeFieldsEmpty =
    emailInputValue === "" || passwordInputValue === "" ? true : false */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await dispatch(
      signIn({ email: emailRef.current, password: passRef.current }),
    )
    setIsSubmitting(false)
  }
  //console.log("LoginForm render")
  return (
    <form onSubmit={handleSubmit}>
      <EmailInput
        setIsEmailFullfilled={setIsEmailFullfilled}
        emailRef={emailRef}
      />
      {/* <PasswordInput
        value={passwordInputValue}
        setValue={setPasswordInputValue}
        error={passwordInputError}
        setError={setPasswordInputError}
      /> */}
      <button
        type="submit"
        disabled={isSubmitting || !(isEmailFullfilled && isPassFullfilled)}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
