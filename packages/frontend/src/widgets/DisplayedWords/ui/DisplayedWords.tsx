import { WordCard } from "@entities/Words"
import styles from "./DisplayedWords.module.css"
import { FormEvent, useState } from "react"

const MAX_COUNT_SHOWED = 5

const wordsInit = [
  {
    eng: "cat",
    rus: "кошка",
    toggle: false,
  },
  {
    eng: "dog",
    rus: "собака",
    toggle: false,
  },
  {
    eng: "car",
    rus: "автомобиль",
    toggle: false,
  },
  {
    eng: "table",
    rus: "стол",
    toggle: false,
  },
  {
    eng: "chair",
    rus: "стул",
    toggle: false,
  },
]

export default () => {
  const [words, setWords] = useState(wordsInit)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement
    const index = target.closest("[data-index]")?.getAttribute("data-index")
    if (typeof index === "string") {
      setWords(prev => [
        ...prev.slice(0, +index),
        { ...prev[+index], toggle: !prev[+index].toggle },
        ...prev.slice(+index + 1, prev.length),
      ])
    }
  }

  return (
    <div className={styles.content} onClick={handleClick}>
      {words.map((word, index) => (
        <WordCard
          key={index}
          index={index.toString()}
          text={word.toggle ? word.rus : word.eng}
        />
      ))}
    </div>
  )
}
