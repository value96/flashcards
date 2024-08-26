import { VocabWord } from "@shared/lib"
import { useState } from "react"
import WordBlock from "./WordBlock"
import styles from "./WordList.module.css"
const words: VocabWord[] = [
  {
    id: "skdks",
    translate: {
      eng: "cat",
      rus: "кошка",
    },
  },
  {
    id: "ksdlopf",
    translate: {
      eng: "dog",
      rus: "собака",
    },
  },
  {
    id: "sld98fd9",
    translate: {
      eng: "car",
      rus: "автомобиль",
    },
  },
]

const WordList = () => {
  const [selectMode, setSelectMode] = useState(false)
  const [selectedWords, setSelectedWords] = useState<VocabWord[]>([])
  const [longPressWord, setLongPressWord] = useState<VocabWord | null>(null)
  const toggleSelectMode = () => {
    setSelectMode(selectMode => !selectMode)
    setSelectedWords([])
  }

  const handleShiftSelect = (startIndex: number, endIndex: number) => {
    const selectedRange = words.slice(
      Math.min(startIndex, endIndex),
      Math.max(startIndex, endIndex) + 1,
    )
    setSelectedWords([...selectedWords, ...selectedRange])
  }

  const handleWordPress = (word: VocabWord) => {
    if (selectMode) {
      // Долгое нажатие для выбора диапазона
      if (!longPressWord) {
        setLongPressWord(word)
      } else {
        const startIndex = words.findIndex(w => w.id === longPressWord.id)
        const endIndex = words.findIndex(w => w.id === word.id)
        handleShiftSelect(startIndex, endIndex)
        setLongPressWord(null) // Завершаем выбор диапазона
      }
    } else {
      // Долгое нажатие для контекстного меню
      openContextMenu(word) // Функция для открытия контекстного меню
    }
  }

  const openContextMenu = (word: VocabWord) => {
    alert(`Контекстное меню для: ${word.id}`)
  }

  const handleSingleSelect = (word: VocabWord) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w.id !== word.id))
    } else {
      setSelectedWords([...selectedWords, word])
    }
  }

  return (
    <div>
      <button className={styles.button} onClick={toggleSelectMode}>
        {selectMode ? "Cancel Selection" : "Select"}
      </button>

      {selectMode && selectedWords.length > 0 && (
        <button className={styles.button}>Change Status</button> // Кнопка изменения статуса становится активной при выборе слов
      )}

      <div className={styles.wordList}>
        {words.map(wordObj => (
          <WordBlock
            key={wordObj.id}
            word={wordObj}
            selectMode={selectMode}
            isSelected={selectedWords.includes(wordObj)}
            onLongPress={handleWordPress}
            onSingleSelect={handleSingleSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default WordList
