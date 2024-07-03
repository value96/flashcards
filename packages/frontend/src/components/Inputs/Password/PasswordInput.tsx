import { yupResolver } from "@hookform/resolvers/yup"
import React, {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react"

import * as yup from "yup"

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 symbols")
    .required("Password is required"),
})

const PasswordInput = forwardRef((props, ref) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    try {
      passwordSchema.validateSync({ password: e.target.value })
      setError("")
    } catch (err: any) {
      setError(err.message)
    }
  }

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    getError: () => error,
    validate: () => {
      try {
        passwordSchema.validateSync({ password: value })
        return true
      } catch (err: any) {
        return false
      }
    },
  }))
  console.log("PasswordInput render")
  return (
    <div>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={value}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
    </div>
  )
})

export default PasswordInput
