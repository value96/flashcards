import type { ChangeEvent} from "react";
import React, { useState } from "react"
import * as yup from "yup"
import type { InputProps } from "../types"

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must include at least 8 symbols")
    .required("Password is required"),
})

const PasswordInput: React.FC<InputProps> = ({
  value,
  setValue,
  error,
  setError,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    try {
      passwordSchema.validateSync({ password: e.target.value })
      setError("")
    } catch (err: any) {
      setError(err.message)
    }
  }

  //console.log(`PasswordInput render`)
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
