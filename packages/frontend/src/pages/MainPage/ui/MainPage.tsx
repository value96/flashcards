import { DisplayedWords } from "@widgets/DisplayedWords"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom"

export default () => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement
    const wordElement = target.closest("[data-action]")
    if (wordElement) {
      const action = wordElement.getAttribute("data-action")
      //if (action === "logout") navigate("/auth")
      if (action === "word-list") navigate("/word-list")
    }
  }

  return (
    <div className={styles.container}>
      <DisplayedWords />
      <div className={styles.buttonsContainer} onClick={handleClick}>
        <button className={styles.button} data-action="logout">
          logout
        </button>
        <button className={styles.button} data-action="word-list">
          WordsList
        </button>
      </div>
    </div>
  )
}
