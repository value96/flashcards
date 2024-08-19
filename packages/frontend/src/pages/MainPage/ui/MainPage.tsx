import { DisplayedWords } from "@widgets/DisplayedWords"
import styles from "./styles.module.css"

export default () => {
  return (
    <div className={styles.container}>
      <DisplayedWords />
      <div className={styles.buttonsContainer}>
        <button className={styles.button}>logout</button>
        <button className={styles.button}>WordsList</button>
      </div>
    </div>
  )
}
