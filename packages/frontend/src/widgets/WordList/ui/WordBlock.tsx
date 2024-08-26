import React, { useState } from "react"
import { VocabWord } from "@shared/lib"
import styles from "./WordBlock.module.css"
interface WordBlockProps {
  word: VocabWord
  selectMode: boolean
  isSelected: boolean
  onLongPress: (word: VocabWord) => void
  onSingleSelect: (word: VocabWord) => void
}

const WordBlock = ({
  word,
  selectMode,
  isSelected,
  onLongPress,
  onSingleSelect,
}: WordBlockProps) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null)

  // Обработчик для долгого нажатия
  const handlePressStart = () => {
    const timer = setTimeout(() => {
      onLongPress(word)
    }, 1000)
    setPressTimer(timer)
  }

  const handlePressEnd = () => {
    if (pressTimer !== null) clearTimeout(pressTimer)
  }

  return (
    <div
      className={`${styles.wordBlock} ${isSelected ? styles.selected : ""}`}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={() => {
        if (selectMode) {
          onSingleSelect(word) // Одиночное нажатие в режиме выбора
        }
      }}
    >
      {selectMode && (
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isSelected}
          onChange={() => onSingleSelect(word)}
        />
      )}
      <span>{word.translate.eng}</span>
    </div>
  )
}

export default WordBlock
