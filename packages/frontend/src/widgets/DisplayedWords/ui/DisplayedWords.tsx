import { WordCard } from "@entities/Words"
import styles from "./DisplayedWords.module.css"

const MAX_COUNT_SHOWED = 5

const words = [
  {
    word: "cat",
    comment: "кэт",
  },
  {
    word: "dog",
    comment: "дог",
  },
  {
    word: "car",
    comment: null,
  },
  {
    word: "table",
    comment: null,
  },
  {
    word: "chair",
    comment: null,
  },
]

export default () => {
  return (
    <div className={styles.content}>
      <div className={styles.wordsContainer}>
        {words.map((word, index) => (
          <WordCard key={index} text={word.word} />
        ))}
      </div>
    </div>
  )
}
