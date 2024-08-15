import React, { useEffect } from "react"
import styles from "./Flashcard.module.css"
import { WordComponent } from "../Word/Word"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  nextFlashcard,
  loadWords,
  selectAllWords,
} from "../../features/flashcard/flashcardSlice"
import { Status } from "../../shared/api/statusEnums"
import { logout } from "../../features/auth/authThunks"

const Flashcard = ({}) => {
  console.log("render Flashcard")
  const dispatch = useAppDispatch()
  const words = useAppSelector(selectAllWords)
  const status = useAppSelector(state => state.flashcard.status)
  const error = useAppSelector(state => state.flashcard.error)
  const countShowingWords = 5

  const handleClick = () => {
    dispatch(nextFlashcard(countShowingWords))
  }

  useEffect(() => {
    if (status === Status.idle) dispatch(loadWords(countShowingWords))
  }, [status])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {status === Status.loading && "Loading"}
        {status === Status.failed && `Error: ${error}`}
        {status === Status.succeeded && (
          <>
            <div className={styles.wordsContainer}>
              {words.map(word => (
                <div key={word.id} className={styles.wordContainer}>
                  <WordComponent {...word} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={handleClick}>
          next
        </button>
        <button className={styles.button} onClick={() => dispatch(logout())}>
          logout
        </button>
      </div>
    </div>
  )
}

export default Flashcard
