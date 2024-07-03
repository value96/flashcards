// src/components/Login.tsx
import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import { useForm } from "react-hook-form"

import { signIn } from "../../../features/auth/authThunks"

import EmailInput from "../../Inputs/Email/EmailInput"
import PasswordInput from "../../Inputs/Password/PasswordInput"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useNavigate } from "react-router-dom"

interface InputRef {
  getValue: () => string
  getError: () => string
  validate: () => boolean
}

const isValid = (refs: React.RefObject<InputRef>[]) => {
  refs.forEach(ref => {
    if (
      !ref.current ||
      ref.current.getValue() === "" ||
      ref.current.getError() != ""
    )
      return false
  })
  return true
}

const SignInForm = () => {
  console.log("render LoginForm")
  const emailInputRef = useRef<InputRef>(null)
  const passwordInputRef = useRef<InputRef>(null)
  const dispatch = useAppDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (emailInputRef.current && passwordInputRef.current) {
      const isEmailValid = emailInputRef.current.validate()
      const isPasswordValid = passwordInputRef.current.validate()

      if (isEmailValid && isPasswordValid) {
        const emailValue = emailInputRef.current.getValue()
        const passwordValue = passwordInputRef.current.getValue()
        await dispatch(signIn({ email: emailValue, password: passwordValue }))
      } else {
        alert("SignIn form failed")
      }

      setIsSubmitting(false)
    }
  }
  console.log("SignInForm render")
  return (
    <form onSubmit={handleSubmit}>
      <EmailInput ref={emailInputRef} />
      <PasswordInput ref={passwordInputRef} />
      <button
        type="submit"
        disabled={isSubmitting || !isValid([emailInputRef, passwordInputRef])}
      >
        Login
      </button>
      {/*  {error && <p>{error}</p>} */}
    </form>
  )
}

export default SignInForm
