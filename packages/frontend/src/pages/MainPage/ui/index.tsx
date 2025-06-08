import { useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { WordsTrainingWidget } from '@widgets/WordsTrainingWidget'
import { useAppDispatch } from '@shared/store'
import { authModel } from '@features/Authorization'
import { ModalWindow } from '@shared/ui'
import { WordsTimeDistribution } from '@widgets/words-time-distribution'

const { logout } = authModel.thunks

export const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isAnalyticsOpen, setAnalyticsOpen] = useState(false)

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

/* const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement
    const wordElement = target.closest("[data-action]")
    if (wordElement) {
      const action = wordElement.getAttribute("data-action")
      if (action === "logout") navigate("/auth")
      if (action === "word-list") navigate("/word-list")
    }
  } */
