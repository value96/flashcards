import React, { ChangeEvent, useState } from "react"
import * as yup from "yup"
import { InputProps } from "../types"

const usernameSchema = yup.object().shape({
  username: yup.string().required("username is required"),
})

const usernameInput: React.FC<InputProps> = ({
  value,
  setValue,
  error,
  setError,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    try {
      usernameSchema.validateSync({ username: e.target.value })
      setError("")
    } catch (err: any) {
      setError(err.message)
    }
  }

  //console.log(`UsernameInput render`)
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
}

export default React.memo(usernameInput)
