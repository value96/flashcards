import { yupResolver } from "@hookform/resolvers/yup"
import React, {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react"

import * as yup from "yup"

const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "username must be at least 6 symbols")
    .required("username is required"),
})

const UsernameInput = forwardRef((props, ref) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    try {
      usernameSchema.validateSync({ username: e.target.value })
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
        usernameSchema.validateSync({ username: value })
        return true
      } catch (err: any) {
        return false
      }
    },
  }))

  return (
    <div>
      <input
        type="username"
        id="username"
        name="username"
        placeholder="Enter your username"
        value={value}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
    </div>
  )
})

export default UsernameInput
