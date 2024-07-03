import React, { ChangeEvent, useState } from "react"
import * as yup from "yup"

const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
})

interface MyComponentProps {
  setValue: React.Dispatch<React.SetStateAction<string>>
  setError: React.Dispatch<React.SetStateAction<string>>
}

const EmailInput: React.FC<MyComponentProps> = ({
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
      emailSchema.validateSync({ email: e.target.value })
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

  console.log(`LoginInput render, value: ${value}`)
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
//export default EmailInput
