/* import React, { useState } from "react"
import styles from "./Word.module.css"
import { useAppDispatch } from "../../app/hooks"
import { forgottenWord } from "../../features/flashcard/flashcardSlice"
import type { Word } from "@flashcards/types"

export const WordComponent = React.memo(({ id, vocabWord }: Word) => {
  console.log(`render ${vocabWord.translate.eng}`)
  const dispatch = useAppDispatch()
  const handleForgotClick = () => {
    dispatch(forgottenWord(id))
  }
  const [text, setText] = useState(vocabWord.translate.eng)
  const toggleTranslate = () => {
    setText(prev =>
      prev === vocabWord.translate.eng
        ? vocabWord.translate.rus
        : vocabWord.translate.eng,
    )
  }

  return (
    <div className={styles.wordContainer}>
      <div className={styles.word} onClick={toggleTranslate}>
        {text}
      </div>
      <button className={styles.forgotButton} onClick={handleForgotClick}>
        😢
      </button>
    </div>
  )
})
 */
