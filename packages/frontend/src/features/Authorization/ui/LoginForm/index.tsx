import { useRef, useState, type FormEvent } from 'react'
import { EmailInput, PasswordInput } from '@shared/ui'
import styles from './styles.module.scss'
import { useSendData } from '@shared/hooks'
import { thunks } from '../../model'

export const LoginForm = () => {
  console.log('LoginForm render')

  const { sendData: auth, error, isLoading } = useSendData(thunks.login)

  const emailRef = useRef('')
  const [isEmailFullfilled, setIsEmailFullfilled] = useState(false)
  const passRef = useRef('')
  const [isPassFullfilled, setIsPassFullfilled] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await auth({ email: emailRef.current, password: passRef.current })
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Authorization</h2>
      <div className={styles.formGroup}>
        <EmailInput
          setIsEmailFullfilled={setIsEmailFullfilled}
          emailRef={emailRef}
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
        disabled={isLoading || !(isEmailFullfilled && isPassFullfilled)}
      >
        Login
      </button>
    </form>
  )
}
