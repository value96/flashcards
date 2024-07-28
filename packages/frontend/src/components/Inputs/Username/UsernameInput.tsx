import type { ChangeEvent, MutableRefObject } from "react"
import React, { useState } from "react"
import * as yup from "yup"
import type { InputProps } from "../types"

const usernameSchema = yup.object().shape({
  username: yup.string().required("username is required"),
})

interface UsernameInputProps {
  setIsUsernameFullfilled: (value: boolean) => void
  usernameRef: MutableRefObject<string>
}

const usernameInput: React.FC<UsernameInputProps> = ({
  setIsUsernameFullfilled,
  usernameRef,
}) => {
  console.log(`UsernameInput render`)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value
    setValue(username)
    usernameRef.current = username

    try {
      usernameSchema.validateSync({ username: username })
      setError("")
      setIsUsernameFullfilled(true)
    } catch (validationError) {
      setError((validationError as yup.ValidationError).message)
      setIsUsernameFullfilled(false)
    }
  }

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
