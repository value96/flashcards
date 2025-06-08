import { useRef, useState } from 'react'
import styles from './styles.module.scss'
import { DateInput } from '@shared/ui'
import { fetchCountWordsForPeriod } from '@features/words-counter/api'

export const WordsTimeDistribution = () => {
  const fromRef = useRef('')
  const toRef = useRef('')
  const [isFromValid, setIsFromValid] = useState(false)
  const [isToValid, setIsToValid] = useState(false)
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const prepareDate = (date: string) => {
    const [d, m, y] = date.split('.')
    return `${y}-${m}-${d}`
  }

  const handleCheck = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetchCountWordsForPeriod({
        from: isFromValid ? prepareDate(fromRef.current) : undefined,
        to: isToValid ? prepareDate(toRef.current) : undefined,
      })
      setCount(res)
    } catch (e: any) {
      setError('Ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <DateInput
        placeholder="Дата от"
        dateRef={fromRef}
        setIsDateFullfilled={setIsFromValid}
      />
      <DateInput
        placeholder="Дата до"
        dateRef={toRef}
        setIsDateFullfilled={setIsToValid}
      />
      <button
        className={styles.button}
        onClick={handleCheck}
        disabled={isLoading}
      >
        check
      </button>
      <div className={styles.count}>{count !== null ? count : ''}</div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
