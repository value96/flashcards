import type { FormEvent } from "react"
import React, { useEffect, useRef, useState } from "react"
import { EmailInput } from "@shared/ui"
import { PasswordInput } from "@shared/ui"
import { UsernameInput } from "@shared/ui"
import { formsStyles } from "@shared/ui"
import { useSendData } from "@shared/hooks/useSendData"
import { thunks } from "../model"
import { toast } from "react-toastify"

const RegisterForm = () => {
  console.log("SignUpForm render")

  const { sendData: reg, error, isLoading } = useSendData(thunks.register)

  const emailRef = useRef("")
  const [isEmailFullfilled, setIsEmailFullfilled] = useState(false)

  const usernameRef = useRef("")
  const [isUsernameFullfilled, setIsUsernameFullfilled] = useState(false)

  const passRef = useRef("")
  const [isPassFullfilled, setIsPassFullfilled] = useState(false)

  /* useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error]) */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await reg({
      email: emailRef.current,
      username: usernameRef.current,
      password: passRef.current,
    })
  }

  return (
    <form className={formsStyles.container} onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <div className={formsStyles.formGroup}>
        <EmailInput
          setIsEmailFullfilled={setIsEmailFullfilled}
          emailRef={emailRef}
        />
      </div>
      <div className={formsStyles.formGroup}>
        <UsernameInput
          setIsUsernameFullfilled={setIsUsernameFullfilled}
          usernameRef={usernameRef}
        />
      </div>
      <div className={formsStyles.formGroup}>
        <PasswordInput
          setIsPassFullfilled={setIsPassFullfilled}
          passRef={passRef}
        />
      </div>
      {error ? error : null}
      <button
        className={formsStyles.button}
        type="submit"
        disabled={
          isLoading ||
          !(isEmailFullfilled && isPassFullfilled && isUsernameFullfilled)
        }
      >
        Register
      </button>
    </form>
  )
}

export default RegisterForm
