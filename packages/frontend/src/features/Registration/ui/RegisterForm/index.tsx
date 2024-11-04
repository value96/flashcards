import { useRef, useState, type FormEvent } from 'react'
import { PasswordInput, UsernameInput, EmailInput } from '@shared/ui'
import styles from './styles.module.scss'
import { useSendData } from '@shared/hooks'
import { thunks } from '../../model'

export const RegisterForm = () => {
  const { sendData: reg, error, isLoading } = useSendData(thunks.register)

  const emailRef = useRef('')
  const [isEmailFullfilled, setIsEmailFullfilled] = useState(false)

  const usernameRef = useRef('')
  const [isUsernameFullfilled, setIsUsernameFullfilled] = useState(false)

  const passRef = useRef('')
  const [isPassFullfilled, setIsPassFullfilled] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await reg({
      email: emailRef.current,
      username: usernameRef.current,
      password: passRef.current,
    })
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <div className={styles.formGroup}>
        <EmailInput
          setIsEmailFullfilled={setIsEmailFullfilled}
          emailRef={emailRef}
        />
      </div>
      <div className={styles.formGroup}>
        <UsernameInput
          setIsUsernameFullfilled={setIsUsernameFullfilled}
          usernameRef={usernameRef}
        />
      </div>
      <div className={styles.formGroup}>
        <PasswordInput
          setIsPassFullfilled={setIsPassFullfilled}
          passRef={passRef}
        />
      </div>
      {error ? error : null}
      <button
        className={styles.button}
        type="submit"
        disabled={
          isLoading ||
          !(isEmailFullfilled && isPassFullfilled && isUsernameFullfilled)
        }
      >
        Register
      </button>
    </form>
  )
}
