import React, { ChangeEvent, useState } from "react"
import * as yup from "yup"
import { InputProps } from "../types"

const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
})

const EmailInput: React.FC<InputProps> = ({
  value,
  setValue,
  error,
  setError,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    try {
      emailSchema.validateSync({ email: e.target.value })
      setError("")
    } catch (err: any) {
      setError(err.message)
    }
  }

  console.log(`LoginInput render`)
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
