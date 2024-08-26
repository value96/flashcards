import React from "react"
import styles from "./WordCard.module.css"

type Props = { text: string; id: string }

export const WordCard = React.memo(({ text, id }: Props) => {
  /* const [text, setText] = useState(vocabWord.translate.eng)
    const toggleTranslate = () => {
      setText(prev =>
        prev === vocabWord.translate.eng
          ? vocabWord.translate.rus
          : vocabWord.translate.eng,
      )
    } */
  console.log(`render WordCard ${id}`)
  return (
    <div data-id={id} className={styles.wordContainer}>
      <div className={styles.word}>{text}</div>
      <button className={styles.forgotButton}>forgot</button>
    </div>
  )
})
