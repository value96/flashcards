import React, { ChangeEvent, useState } from "react"
import * as yup from "yup"

const passwordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
})

interface MyComponentProps {
  setValue: React.Dispatch<React.SetStateAction<string>>
  setError: React.Dispatch<React.SetStateAction<string>>
}

const PasswordInput: React.FC<MyComponentProps> = ({
  setValue: setOuterValue,
  setError: setOuterError,
}) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    //console.log(`setted inner value: ${e.target.value}`)
    setOuterValue(e.target.value)
    //console.log(`setted outer value: ${e.target.value}`)
    try {
      passwordSchema.validateSync({ password: e.target.value })
      setError("")
      //console.log(`setted inner error: ${""}`)
      setOuterError("")
      //console.log(`setted outer error: ${""}`)
    } catch (err: any) {
      setError(err.message)
      //console.log(`setted inner error: ${err.message}`)
      setOuterError(err.message)
      //console.log(`setted outer error: ${err.message}`)
    }
  }

  console.log(`PasswordInput render, value: ${value}`)
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
//export default PasswordInput
