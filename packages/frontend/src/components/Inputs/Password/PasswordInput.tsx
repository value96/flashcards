import type { ChangeEvent, MutableRefObject } from "react"
import React, { useState } from "react"
import * as yup from "yup"
import type { InputProps } from "../types"

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must include at least 8 symbols")
    .required("Password is required"),
})

interface EmailInputProps {
  setIsPassFullfilled: (value: boolean) => void
  passRef: MutableRefObject<string>
}

const PasswordInput: React.FC<EmailInputProps> = ({
  setIsPassFullfilled,
  passRef,
}) => {
  console.log(`PasswordInput render`)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value
    setValue(pass)
    passRef.current = pass

    try {
      passwordSchema.validateSync({ password: pass })
      setError("")
      setIsPassFullfilled(true)
    } catch (validationError) {
      setError((validationError as yup.ValidationError).message)
      setIsPassFullfilled(false)
    }
  }

  return (
    <div>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your Password"
        value={value}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
    </div>
  )
}

export default React.memo(PasswordInput)
