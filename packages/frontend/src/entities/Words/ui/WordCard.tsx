import React from "react"
import styles from "./WordCard.module.css"

type Props = { text: string; index: string }

export const WordCard = React.memo(({ text, index }: Props) => {
  /* const [text, setText] = useState(vocabWord.translate.eng)
    const toggleTranslate = () => {
      setText(prev =>
        prev === vocabWord.translate.eng
          ? vocabWord.translate.rus
          : vocabWord.translate.eng,
      )
    } */
  console.log(`render WordCard ${index}`)
  return (
    <div data-index={index} className={styles.wordContainer}>
      <div className={styles.word}>{text}</div>
      <button className={styles.forgotButton}>forgot</button>
    </div>
  )
})
