import { useAppSelector } from '@shared/store'
import { wordsCounterModel } from '..'

const { repeatedWordsWithinSession, countWordsToRepeatToday } =
  wordsCounterModel.selectors
export const WordsCounter = () => {
  const repeatedWords = useAppSelector(repeatedWordsWithinSession)
  const restCountWordsForToday = useAppSelector(countWordsToRepeatToday)

  return `${repeatedWords} / ${restCountWordsForToday}`
}
