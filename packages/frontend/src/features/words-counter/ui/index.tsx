import { useAppSelector } from '@shared/store'
import { wordsCounterModel } from '..'
import styles from './styles.module.scss'

const { repeatedWordsWithinSession, countWordsToRepeatToday } =
  wordsCounterModel.selectors
export const WordsCounter = () => {
  const repeatedWords = useAppSelector(repeatedWordsWithinSession)
  const restCountWordsForToday = useAppSelector(countWordsToRepeatToday)

  return (
    <div className={styles.wordsCounter}>
      {`${repeatedWords} / ${restCountWordsForToday === null ? '' : restCountWordsForToday}`}
    </div>
  )
}
