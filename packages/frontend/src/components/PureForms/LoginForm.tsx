import React, { FormEvent, useState } from "react"
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"

const LoginForm = () => {
  const [emailInputValue, setEmailInputValue] = useState("")
  const [emailInputError, setEmailInputError] = useState("")

  const [passwordInputValue, setPasswordInputValue] = useState("")
  const [passwordInputError, setPasswordInputError] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)

  const isThereInputsErrors =
    emailInputError === "" && passwordInputError === "" ? false : true
  const isEmpty =
    emailInputValue === "" && passwordInputValue === "" ? true : false

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    alert(JSON.stringify({ emailInputValue, passwordInputValue }))

    setIsSubmitting(false)
  }
  console.log("LoginForm render")
  return (
    <form onSubmit={handleSubmit}>
      <EmailInput setValue={setEmailInputValue} setError={setEmailInputError} />
      <PasswordInput
        setValue={setPasswordInputValue}
        setError={setPasswordInputError}
      />
      <button
        type="submit"
        disabled={isSubmitting || isThereInputsErrors || isEmpty}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
