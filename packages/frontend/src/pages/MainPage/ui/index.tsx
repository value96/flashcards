import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { WordsTrainingWidget } from '@widgets/WordsTrainingWidget'
import { useAppDispatch } from '@shared/store'
import { authModel } from '@features/Authorization'

const { logout } = authModel.thunks

export const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleWordsList = () => {
    navigate('/word-list')
  }

  return (
    <div className={styles.container}>
      <WordsTrainingWidget />
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={handleLogout}>
          logout
        </button>
        <button className={styles.button} onClick={handleWordsList}>
          WordsList
        </button>
      </div>
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
