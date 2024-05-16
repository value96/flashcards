import React from "react"
import styles from "./Word.module.css"
import { useAppDispatch } from "../../app/hooks"
import { sendForgottenWord } from "../flashcard/flashcardSlice"

export const Word = React.memo(({ id, text }: { id: string; text: string }) => {
  const dispatch = useAppDispatch()
  const handleForgotClick = () => {
    dispatch(sendForgottenWord(id))
  }

  return (
    <div className={styles.wordContainer}>
      <div className={styles.word}>{text}</div>
      <button className={styles.forgotButton} onClick={handleForgotClick}>
        😢
      </button>
    </div>
  )
})
