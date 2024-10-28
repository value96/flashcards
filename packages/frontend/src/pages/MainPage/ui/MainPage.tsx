import { DisplayedWords } from "@widgets/DisplayedWords"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@shared/store"
import { logout } from "@features/Authorization/model/authThunks"

export const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleWordsList = () => {
    navigate("/word-list")
  }

  return (
    <div className={styles.container}>
      <DisplayedWords />
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
