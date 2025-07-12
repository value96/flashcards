import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { wordsTrainingModel, wordsTrainingApi } from '@entities/WordsTraining'
import copyIcon from '@assets/copy.svg'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { WordCard } from './WordCard'
import { type Language } from '@shared/model'
import { WordsCounter, wordsCounterModel } from '@features/words-counter'

const MAX_COUNT_SHOWED = 7

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
  const restCountWordsForToday = useAppSelector(
    wordsCounterModel.selectors.countWordsToRepeatToday,
  )

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
    const repeatedCount = words.length

    try {
      await dispatch(
        wordsTrainingModel.thunks.loadNextBunchWords({
          count: MAX_COUNT_SHOWED,
          isNeedSendRepeatedWords: true,
        }),
      ).unwrap()

      dispatch(wordsCounterModel.actions.increase(repeatedCount))
      setFlippedWords({})
    } catch (e) {
      console.error('failed to load next words', e)
    }
  }

  const handleClickCopyWords = async () => {
    if (!restCountWordsForToday) return

    try {
      const wordsList = await wordsTrainingApi.getNextBunchWords({
        count: restCountWordsForToday,
        wordsData: [],
      })

      const text = wordsList.map(w => w.vocabWord.eng).join('\n')

      await navigator.clipboard.writeText(text)
    } catch (e) {
      console.error('failed to copy words', e)
    }
  }

  return (
    <>
      <div className={styles.content}>
        {words.map(
          ({ _id, vocabWord, nextShowTranslate, isSuccessRepeated }) => {
            const text = vocabWord
              ? vocabWord[
                  chooseWhatSideShow(nextShowTranslate, flippedWords[_id])
                ]
              : 'null'
            return (
              <WordCard
                key={_id}
                id={_id}
                vocabWordId={vocabWord.id}
                text={text}
                isSuccessRepeated={isSuccessRepeated}
                onClickCard={handleClickCard}
                onClickForgot={handleClickForgot}
              />
            )
          },
        )}
      </div>
      <WordsCounter />
      <div className={styles.actions}>
        <button className={styles.copyWordsButton} onClick={handleClickCopyWords}>
          <img src={copyIcon} alt="copy words" width={20} height={20} />
        </button>
        <button className={styles.nextWordsButton} onClick={handleClickNextWords}>
          Далее
        </button>
      </div>
    </>
  )
}
