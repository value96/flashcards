import React, { FormEvent, useState } from "react"
import EmailInput from "../../Inputs/Email/EmailInput"
import PasswordInput from "../../Inputs/Password/PasswordInput"
import { signUp } from "../../../features/auth/authThunks"
import { useAppDispatch } from "../../../app/hooks"
import UsernameInput from "../../Inputs/Username/UsernameInput"

const SignUpForm = () => {
  const dispatch = useAppDispatch()
  const [emailInputValue, setEmailInputValue] = useState("")
  const [emailInputError, setEmailInputError] = useState("")

  const [usernameInputValue, setUsernameInputValue] = useState("")
  const [usernameInputError, setUsernameInputError] = useState("")

  const [passwordInputValue, setPasswordInputValue] = useState("")
  const [passwordInputError, setPasswordInputError] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)

  const isThereInputsErrors =
    emailInputError === "" &&
    usernameInputError === "" &&
    passwordInputError === ""
      ? false
      : true
  const isSomeFieldsEmpty =
    emailInputValue === "" ||
    usernameInputValue === "" ||
    passwordInputValue === ""
      ? true
      : false

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await dispatch(
      signUp({
        email: emailInputValue,
        username: usernameInputValue,
        password: passwordInputValue,
      }),
    )

    setIsSubmitting(false)
  }
  //console.log("SignUpForm render")
  return (
    <form onSubmit={handleSubmit}>
      <EmailInput
        value={emailInputValue}
        setValue={setEmailInputValue}
        error={emailInputError}
        setError={setEmailInputError}
      />
      <UsernameInput
        value={usernameInputValue}
        setValue={setUsernameInputValue}
        error={usernameInputError}
        setError={setUsernameInputError}
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
        Register
      </button>
    </form>
  )
}

export default SignUpForm
