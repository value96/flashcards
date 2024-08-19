import styles from "./WordCard.module.css"

export const WordCard = ({ text }: { text: string }) => {
  /* const [text, setText] = useState(vocabWord.translate.eng)
    const toggleTranslate = () => {
      setText(prev =>
        prev === vocabWord.translate.eng
          ? vocabWord.translate.rus
          : vocabWord.translate.eng,
      )
    } */

  return (
    <div className={styles.wordContainer}>
      <div className={styles.word}>{text}</div>
      <button className={styles.forgotButton}>forgot</button>
    </div>
  )
}
