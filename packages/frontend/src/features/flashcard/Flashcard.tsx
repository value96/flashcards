import React, { useEffect } from "react"
import styles from "./Flashcard.module.css"
import { Word } from "../word/Word"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { nextFlashcard, loadWords, selectAllWords } from "./flashcardSlice"
import { Status } from "../../types/Status"

//import { Status } from "../../types/enums"

export const Flashcard = ({}) => {
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
  }, [status, dispatch])

  return (
    <div className={styles.container}>
      {status === Status.loading && "Loading"}
      {status === Status.failed && `Error: ${error}`}
      {status === Status.succeeded && (
        <>
          {words.map(word => (
            <Word
              key={word.id}
              id={word.id}
              text={word.vocabWord.translate.eng}
            />
          ))}
          <button onClick={handleClick}>next bunch of words</button>
        </>
      )}
    </div>
  )
}
