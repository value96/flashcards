import { useAppDispatch, useAppSelector } from '@shared/store'
import { wordsCounterModel } from '..'
import styles from './styles.module.scss'
import { useEffect } from 'react'
import { thunks } from '../model'

const { repeatedWordsWithinSession, countWordsToRepeatToday } =
  wordsCounterModel.selectors
export const WordsCounter = () => {
  const dispatch = useAppDispatch()
  const repeatedWords = useAppSelector(repeatedWordsWithinSession)
  const restCountWordsForToday = useAppSelector(countWordsToRepeatToday)

  useEffect(() => {
    if (restCountWordsForToday === null)
      dispatch(thunks.getCountWordsForUntilTomorrow())
  }, [restCountWordsForToday])

  return (
    <div className={styles.wordsCounter}>
      {`${repeatedWords} / ${restCountWordsForToday === null ? '' : restCountWordsForToday}`}
    </div>
  )
}
