import { useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { WordsTrainingWidget } from '@widgets/WordsTrainingWidget'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { authModel } from '@features/Authorization'
import { ModalWindow } from '@shared/ui'
import { WordsTimeDistribution } from '@widgets/words-time-distribution'
import { wordsCounterModel } from '@features/words-counter'
import { wordsTrainingApi } from '@entities/WordsTraining'

const { logout } = authModel.thunks

export const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isAnalyticsOpen, setAnalyticsOpen] = useState(false)
  const restCountWordsForToday = useAppSelector(
    wordsCounterModel.selectors.countWordsToRepeatToday,
  )

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleWordsList = () => {
    navigate('/word-list')
  }

  const openAnalytics = () => {
    setAnalyticsOpen(true)
  }

  const closeAnalytics = () => {
    setAnalyticsOpen(false)
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
    <div className={styles.container}>
      <WordsTrainingWidget />
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={handleWordsList}>
          Добавить слова
        </button>
        <button className={styles.button} onClick={openAnalytics}>
          Аналитика
        </button>
        <button className={styles.button} onClick={handleClickCopyWords}>
          Скопировать слова
        </button>
        <button className={styles.button} onClick={handleLogout}>
          Выйти
        </button>
      </div>
      <ModalWindow isOpen={isAnalyticsOpen} onClose={closeAnalytics}>
        <WordsTimeDistribution />
      </ModalWindow>
    </div>
  )
}
