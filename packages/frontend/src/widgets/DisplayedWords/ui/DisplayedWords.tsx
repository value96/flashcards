import { wordsModel } from "@entities/Words"
import styles from "./DisplayedWords.module.css"
import { useAppDispatch, useAppSelector } from "@shared/store"
import { useEffect, useState } from "react"
import { WordCard } from "./WordCard"

const MAX_COUNT_SHOWED = 5

export default () => {
  const dispatch = useAppDispatch()
  const words = useAppSelector(wordsModel.selectors.selectAllWords)

  const [flippedWords, setFlippedWords] = useState<{ [key: string]: boolean }>(
    {},
  )

  useEffect(() => {
    const initialFlippedWords: { [key: string]: boolean } = {}
    words.forEach(word => {
      initialFlippedWords[word.id] = false // Инициализируем перевёрнутость как false
    })
    setFlippedWords(initialFlippedWords)
  }, [words])

  useEffect(() => {
    dispatch(wordsModel.thunks.loadWords(MAX_COUNT_SHOWED))
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement
    const wordElement = target.closest("[data-id]")
    if (wordElement) {
      const wordId = wordElement.getAttribute("data-id")
      if (wordId) {
        setFlippedWords(prevState => ({
          ...prevState,
          [wordId]: !prevState[wordId], // Переключаем состояние перевёрнутости для слова
        }))
      }
    }
  }

  return (
    <div className={styles.content} onClick={handleClick}>
      {words.map(({ id, vocabWord }) => (
        <WordCard
          key={id}
          id={id}
          text={
            flippedWords[id] ? vocabWord.translate.rus : vocabWord.translate.eng
          }
        />
      ))}
    </div>
  )
}
