import type { FormEvent } from "react"
import React, { useEffect, useRef, useState } from "react"
import { EmailInput } from "@shared/ui/Inputs"
import { PasswordInput } from "@shared/ui/Inputs"
import { UsernameInput } from "@shared/ui/Inputs"
import { styles } from "@shared/ui/Forms"
import { useSendData } from "@shared/hooks/useSendData"
import { register } from "../model/registerThunk"
import { toast } from "react-toastify"

const RegisterForm = () => {
  console.log("SignUpForm render")

  const { sendData: reg, error, isLoading } = useSendData(register)

  const emailRef = useRef("")
  const [isEmailFullfilled, setIsEmailFullfilled] = useState(false)

  const usernameRef = useRef("")
  const [isUsernameFullfilled, setIsUsernameFullfilled] = useState(false)

  const passRef = useRef("")
  const [isPassFullfilled, setIsPassFullfilled] = useState(false)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await reg({
      email: emailRef.current,
      username: usernameRef.current,
      password: passRef.current,
    })
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
