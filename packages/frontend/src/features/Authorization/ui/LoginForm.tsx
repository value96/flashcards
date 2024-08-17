import React, { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { EmailInput } from "@shared/ui/Inputs"
import { PasswordInput } from "@shared/ui/Inputs"
import { styles } from "@shared/ui/Forms"
import { useSendData } from "@shared/hooks/useSendData"
import { login } from "../model/authThunks"
import { toast } from "react-toastify"

const LoginForm = () => {
  console.log("LoginForm render")

  const { sendData: auth, error, isLoading } = useSendData(login)

  const emailRef = useRef("")
  const [isEmailFullfilled, setIsEmailFullfilled] = useState(false)
  const passRef = useRef("")
  const [isPassFullfilled, setIsPassFullfilled] = useState(false)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await auth({ email: emailRef.current, password: passRef.current })
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Authorization</h2>
      <div className={styles.formGroup}>
        <EmailInput
          setIsEmailFullfilled={setIsEmailFullfilled}
          emailRef={emailRef}
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
        disabled={isLoading || !(isEmailFullfilled && isPassFullfilled)}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
