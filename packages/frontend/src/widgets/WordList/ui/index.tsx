import { VocabWord } from '@shared/lib'
import { useState } from 'react'
import { WordBlock } from './WordBlock'
import styles from './styles.module.scss'
const words: VocabWord[] = [
  {
    id: 'skdks',
    translate: {
      eng: 'cat',
      rus: 'кошка',
    },
  },
  {
    id: 'ksdlopf',
    translate: {
      eng: 'dog',
      rus: 'собака',
    },
  },
  {
    id: 'sld98fd9',
    translate: {
      eng: 'car',
      rus: 'автомобиль',
    },
  },
  {
    id: 'dfioiwl',
    translate: {
      eng: 'table',
      rus: 'стол',
    },
  },
  {
    id: 'dfkgso',
    translate: {
      eng: 'chair',
      rus: 'стул',
    },
  },
]

export const WordList = () => {
  const [selectMode, setSelectMode] = useState(false)
  const [selectedWords, setSelectedWords] = useState<{
    [key: string]: boolean
  }>({})
  const [longPressWord, setLongPressWord] = useState<VocabWord | null>(null)

  const toggleSelectMode = () => {
    setSelectMode(selectMode => !selectMode)
    setSelectedWords({})
  }

  const handleShiftSelect = (startIndex: number, endIndex: number) => {
    const startMinIndex = Math.min(startIndex, endIndex)
    const startMaxIndex = Math.max(startIndex, endIndex)
    const newSelectedWords: {
      [key: string]: boolean
    } = {}
    for (let i = startMinIndex; i <= startMaxIndex; i++)
      newSelectedWords[words[i].id] = true

    setSelectedWords(prev => ({ ...prev, ...newSelectedWords }))
  }

  const handleWordPress = (word: VocabWord) => {
    if (selectMode) {
      if (!longPressWord) {
        setLongPressWord(word)
        const index = words.findIndex(w => w.id === word.id)
        handleShiftSelect(index, index)
      } else {
        const startIndex = words.findIndex(w => w.id === longPressWord.id)
        const endIndex = words.findIndex(w => w.id === word.id)
        console.log(`startIndex: ${startIndex} endIndex: ${endIndex}`)
        handleShiftSelect(startIndex, endIndex)
        setLongPressWord(null)
      }
    } else {
      openContextMenu(word)
    }
  }

  const openContextMenu = (word: VocabWord) => {
    alert(`Контекстное меню для: ${word.id}`)
  }

  const handleSingleSelect = (word: VocabWord) => {
    //console.log("handleSingleSelect")
    if (word.id in selectedWords) {
      setSelectedWords(prev => {
        const { [word.id]: _, ...next } = prev
        return next
      })
    } else {
      setSelectedWords(prev => ({ ...prev, [word.id]: true }))
    }
  }

  return (
    <div>
      <button className={styles.wordListButton} onClick={toggleSelectMode}>
        {selectMode ? 'Cancel Selection' : 'Select'}
      </button>

      {selectMode && Object.keys(selectedWords).length > 0 && (
        <button className={styles.wordListButton}>Change Status</button>
      )}

      <div className={styles.wordList}>
        {words.map(wordObj => (
          <WordBlock
            key={wordObj.id}
            word={wordObj}
            selectMode={selectMode}
            isSelected={wordObj.id in selectedWords}
            onLongPress={handleWordPress}
            onSingleSelect={handleSingleSelect}
          />
        ))}
      </div>
    </div>
  )
}
