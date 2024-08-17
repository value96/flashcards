import type { ChangeEvent, MutableRefObject } from "react"
import React, { useState } from "react"
import * as yup from "yup"
import styles from "../Input.module.css"
const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
})

interface EmailInputProps {
  setIsEmailFullfilled: (value: boolean) => void
  emailRef: MutableRefObject<string>
}

const EmailInput: React.FC<EmailInputProps> = ({
  setIsEmailFullfilled,
  emailRef,
}) => {
  //console.log(`EmailInput render`)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setValue(email)
    emailRef.current = email

    try {
      emailSchema.validateSync({ email: email })
      setError("")
      setIsEmailFullfilled(true)
    } catch (validationError) {
      setError((validationError as yup.ValidationError).message)
      setIsEmailFullfilled(false)
    }
  }

  return (
    <div className={styles.formGroup}>
      <input
        className={styles.input}
        type="email"
        id="email"
        name="email"
        placeholder="Enter your Email"
        value={value}
        onChange={handleChange}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export default React.memo(EmailInput)
