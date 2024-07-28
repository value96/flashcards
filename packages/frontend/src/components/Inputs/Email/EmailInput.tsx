import type { ChangeEvent, MutableRefObject } from "react"
import React, { useState } from "react"
import * as yup from "yup"
import type { InputProps } from "../types"

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
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setValue(email)
    emailRef.current = email

    try {
      emailSchema.validateSync({ email: e.target.value })
      setError("")
      setIsEmailFullfilled(true)
    } catch (validationError) {
      setError((validationError as yup.ValidationError).message)
      setIsEmailFullfilled(false)
    }
  }

  //console.log(`LoginInput render`)
  return (
    <div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your Email"
        value={value}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
    </div>
  )
}

export default React.memo(EmailInput)
