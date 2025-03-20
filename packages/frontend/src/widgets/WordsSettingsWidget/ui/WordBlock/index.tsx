import { memo } from 'react'
import { type wordsSettingsModel } from '@entities/WordsSettings'
import styles from './styles.module.scss'

type VocabWord = wordsSettingsModel.types.VocabWord
interface WordBlockProps {
  index: number
  word: VocabWord
  isSelectMode: boolean
  isSelected: boolean

  onPressDown: (id: string) => void
  onPressUp: (id: string) => void
}

export const WordBlock = memo(
  ({
    index,
    word,
    isSelectMode,
    isSelected,
    onPressDown,
    onPressUp,
  }: WordBlockProps) => {
    //if (word.id === 1) console.log(`render WordBlock ${word.id}`)
    console.log(`render WordBlock ${word.id}`)
    const status = word.word?.status
    return (
      <div
        className={`${styles.wordBlock} ${status ? styles[word!.word!.status] : styles.idle}`}
      >
        {isSelectMode && (
          <input
            onPointerDown={() => {
              console.log('onPointerDown')
              onPressDown(String(word.id))
            }}
            onPointerUp={() => {
              console.log('onPointerUp')
              onPressUp(String(word.id))
            }}
            className={styles.checkbox}
            type="checkbox"
            checked={isSelected}
            readOnly={true}
          />
        )}
        <div>{index + 1}</div>
        <div className={styles.text}>{word.eng}</div>
      </div>
    )
  },
)
