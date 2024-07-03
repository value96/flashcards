// src/components/Login.tsx
import React, { ChangeEvent, FormEvent, useRef, useState } from "react"

import { signUp } from "../../../features/auth/authThunks"

import PasswordInput from "../../Inputs/Password/PasswordInput"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useNavigate } from "react-router-dom"
import EmailInput from "../../Inputs/Email/EmailInput"
import UsernameInput from "../../Inputs/Username/UsernameInput"

interface InputRef {
  getValue: () => string
  validate: () => boolean
}

const SignUpForm = () => {
  const emailInputRef = useRef<InputRef>(null)
  const usernameInputRef = useRef<InputRef>(null)
  const passwordInputRef = useRef<InputRef>(null)
  const dispatch = useAppDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)
  console.log("render SignUpForm")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (
      emailInputRef.current &&
      usernameInputRef.current &&
      passwordInputRef.current
    ) {
      const isEmailValid = emailInputRef.current.validate()
      const emailValue = emailInputRef.current.getValue()

      const isUsernameValid = usernameInputRef.current.validate()
      const usernameValue = usernameInputRef.current.getValue()

      const isPasswordValid = passwordInputRef.current.validate()
      const passwordValue = passwordInputRef.current.getValue()

      if (isEmailValid && isUsernameValid && isPasswordValid) {
        await dispatch(
          signUp({
            email: emailValue,
            username: usernameValue,
            password: passwordValue,
          }),
        )
      } else {
        console.error("SignUp form failed")
      }

      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <EmailInput ref={emailInputRef} />
      <UsernameInput ref={usernameInputRef} />
      <PasswordInput ref={passwordInputRef} />
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
      {/*  {error && <p>{error}</p>} */}
    </form>
  )
}

export default SignUpForm
