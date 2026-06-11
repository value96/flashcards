import { useRef, useState } from 'react'
import styles from './styles.module.scss'
import { DateInput } from '@shared/ui'
import {
  fetchCountWordsForPeriod,
  fetchNewWordsForecast,
  type NewWordsForecast,
} from '@features/words-counter/api'

export const WordsTimeDistribution = () => {
  const fromRef = useRef('')
  const toRef = useRef('')
  const [isFromValid, setIsFromValid] = useState(false)
  const [isToValid, setIsToValid] = useState(false)
  const [count, setCount] = useState<number | null>(null)
  const [forecast, setForecast] = useState<NewWordsForecast | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isForecastLoading, setIsForecastLoading] = useState(false)

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

  const handleForecast = async () => {
    setIsForecastLoading(true)
    setError(null)
    try {
      const res = await fetchNewWordsForecast()
      setForecast(res)
    } catch (e: any) {
      setError('Ошибка')
    } finally {
      setIsForecastLoading(false)
    }
  }

  return (
    <div className={styles.columnContainer}>
      <h5>Узнать сколько слов нужно будет повторить в указанные даты</h5>
      <div className={styles.rowContainer}>
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
      <div className={styles.forecastContainer}>
        <button
          className={styles.button}
          onClick={handleForecast}
          disabled={isForecastLoading}
        >
          Прогноз новых слов
        </button>
        {forecast && (
          <div className={styles.forecast}>
            <div>
              Комфортно: {forecast.suggestedNewWords.comfortable} слов
              <span className={styles.forecastNote}>
                до {forecast.dailyLimits.comfortable} повторений/день
              </span>
            </div>
            <div>
              Агрессивно: {forecast.suggestedNewWords.aggressive} слов
              <span className={styles.forecastNote}>
                до {forecast.dailyLimits.aggressive} повторений/день
              </span>
            </div>
            <div className={styles.forecastNote}>
              Горизонт: {forecast.horizonInDays} дней
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
