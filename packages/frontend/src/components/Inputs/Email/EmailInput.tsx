import { yupResolver } from "@hookform/resolvers/yup"
import React, {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react"

import * as yup from "yup"

const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
})

const EmailInput = forwardRef((props, ref) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    try {
      emailSchema.validateSync({ email: e.target.value })
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
        emailSchema.validateSync({ email: value })
        return true
      } catch (err: any) {
        return false
      }
    },
  }))

  console.log("EmailInput render")
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
})

export default EmailInput
