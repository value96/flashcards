import { useState, type ChangeEvent, type MutableRefObject } from 'react'
import * as yup from 'yup'
import styles from '../Input.module.css'

const dateSchema = yup.object().shape({
  date: yup
    .string()
    .matches(/^\d{2}\.\d{2}\.\d{4}$/u, 'Формат: дд.мм.гггг')
    .required('Введите дату'),
})

interface DateInputProps {
  dateRef: MutableRefObject<string>
  setIsDateFullfilled: (value: boolean) => void
  placeholder?: string
}

export const DateInput = ({
  dateRef,
  setIsDateFullfilled,
  placeholder,
}: DateInputProps) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value
    setValue(dateStr)
    dateRef.current = dateStr
    try {
      dateSchema.validateSync({ date: dateStr })
      const [d, m, y] = dateStr.split('.')
      const isValidDate = !isNaN(Date.parse(`${y}-${m}-${d}`))
      if (!isValidDate) throw new Error('Неверная дата')
      setError('')
      setIsDateFullfilled(true)
    } catch (err) {
      setError((err as yup.ValidationError).message)
      setIsDateFullfilled(false)
    }
  }

  return (
    <div className={styles.formGroup}>
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}
