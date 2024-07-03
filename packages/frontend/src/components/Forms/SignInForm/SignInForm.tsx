import React, { FormEvent, useState } from "react"
import EmailInput from "../../Inputs/Email/EmailInput"
import PasswordInput from "../../Inputs/Password/PasswordInput"
import { useAppDispatch } from "../../../app/hooks"
import { signIn } from "../../../features/auth/authThunks"

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const [emailInputValue, setEmailInputValue] = useState("")
  const [emailInputError, setEmailInputError] = useState("")

  const [passwordInputValue, setPasswordInputValue] = useState("")
  const [passwordInputError, setPasswordInputError] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)

  const isThereInputsErrors =
    emailInputError === "" && passwordInputError === "" ? false : true
  const isSomeFieldsEmpty =
    emailInputValue === "" || passwordInputValue === "" ? true : false

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await dispatch(
      signIn({ email: emailInputValue, password: passwordInputValue }),
    )
    setIsSubmitting(false)
  }
  //console.log("LoginForm render")
  return (
    <form onSubmit={handleSubmit}>
      <EmailInput
        value={emailInputValue}
        setValue={setEmailInputValue}
        error={emailInputError}
        setError={setEmailInputError}
      />
      <PasswordInput
        value={passwordInputValue}
        setValue={setPasswordInputValue}
        error={passwordInputError}
        setError={setPasswordInputError}
      />
      <button
        type="submit"
        disabled={isSubmitting || isThereInputsErrors || isSomeFieldsEmpty}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
