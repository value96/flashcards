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
  const [preventClick, setPreventClick] = useState(false)

  // Обработчик для долгого нажатия
  const handlePressStart = () => {
    const timer = setTimeout(() => {
      setPreventClick(true)
      onLongPress(word)
    }, 200)
    setPressTimer(timer)
  }

  const handlePressEnd = () => {
    if (pressTimer !== null) {
      clearTimeout(pressTimer)
      setPressTimer(null)
    }
  }

  const handleClick = () => {
    console.log("handleClick")
    if (selectMode) {
      console.log(`handleClick-> ${selectMode}`)
      if (preventClick) {
        console.log(`handleClick-> ${selectMode}-> ${preventClick}->return`)
        setPreventClick(false)
        return
      }
      console.log("onclick")
      onSingleSelect(word)
    }
  }

  return (
    <div
      className={`${styles.wordBlock} ${isSelected ? styles.selected : ""}`}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={handleClick}
    >
      {selectMode && (
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isSelected}
          readOnly={true}
          /* onChange={() => onSingleSelect(word)} */
        />
      )}
      <span>{word.id}</span>
    </div>
  )
}

export default WordBlock
