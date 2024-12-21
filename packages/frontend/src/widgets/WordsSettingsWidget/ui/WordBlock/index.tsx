import { useState, memo } from 'react'
import { wordsSettingsModel } from '@entities/WordsSettings'
import styles from './styles.module.scss'

type VocabWord = wordsSettingsModel.types.VocabWord
interface WordBlockProps {
  word: VocabWord
  isSelectMode: boolean
  isSelected: boolean

  onPressDown: (id: string) => void
  onPressUp: (id: string) => void
}

export const WordBlock = memo(
  ({
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
        onPointerDown={() => {
          console.log('onPointerDown')
          onPressDown(String(word.id))
        }}
        onPointerUp={() => {
          console.log('onPointerUp')
          onPressUp(String(word.id))
        }}
      >
        {isSelectMode && (
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={isSelected}
            readOnly={true}
          />
        )}
        <span>{word.eng}</span>
      </div>
    )
  },
)
