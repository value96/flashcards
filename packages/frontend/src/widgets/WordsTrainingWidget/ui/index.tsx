import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { wordsTrainingModel } from '@entities/WordsTraining'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { WordCard } from './WordCard'
import { Language } from '@shared/model'

const MAX_COUNT_SHOWED = 5

function chooseWhatSideShow(
  nextShowTranslate: Language,
  isFlipped: boolean,
): Language {
  if (isFlipped) {
    if (nextShowTranslate === 'eng') return 'rus'
    else return 'eng'
  } else {
    if (nextShowTranslate === 'eng') return 'eng'
    else return 'rus'
  }
}

export const WordsTrainingWidget = () => {
  const dispatch = useAppDispatch()
  const words = useAppSelector(wordsTrainingModel.selectors.selectAllWords)

  const [flippedWords, setFlippedWords] = useState<{ [key: string]: boolean }>(
    {},
  )

  useEffect(() => {
    dispatch(
      wordsTrainingModel.thunks.loadNextBunchWords({
        count: MAX_COUNT_SHOWED,
        isNeedSendRepeatedWords: false,
      }),
    )
  }, [])

  const handleClickCard = (id: string) => {
    setFlippedWords(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  const handleClickForgot = (id: string) => {
    dispatch(wordsTrainingModel.actions.forgot(id))
  }

  const handleClickNextWords = async () => {
    await dispatch(
      wordsTrainingModel.thunks.loadNextBunchWords({
        count: MAX_COUNT_SHOWED,
        isNeedSendRepeatedWords: true,
      }),
    )
    setFlippedWords({})
  }

  return (
    <>
      <div className={styles.content}>
        {words.map(({ _id, vocabWord, nextShowTranslate }) => {
          const text = vocabWord
            ? vocabWord[
                chooseWhatSideShow(nextShowTranslate, flippedWords[_id])
              ]
            : 'null'
          return (
            <WordCard
              key={_id}
              id={_id}
              text={text}
              onClickCard={handleClickCard}
              onClickForgot={handleClickForgot}
            />
          )
        })}
      </div>
      <button onClick={handleClickNextWords}>Next Words</button>
    </>
  )
}

/* const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const target = e.target as HTMLDivElement
  const wordElement = target.closest('[data-id]')
  if (wordElement) {
    const wordId = wordElement.getAttribute('data-id')
    if (wordId) {
      setFlippedWords(prevState => ({
        ...prevState,
        [wordId]: !prevState[wordId], // Переключаем состояние перевёрнутости для слова
      }))
    }
  }
}
 */
