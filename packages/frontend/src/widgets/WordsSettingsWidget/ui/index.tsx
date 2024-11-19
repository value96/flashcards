import { useEffect, useState } from 'react'
import { WordBlock } from './WordBlock'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { wordsSettingsModel } from '@entities/WordsSettings'

type VocabWord = wordsSettingsModel.types.VocabWord

export const WordsSettingsWidget = () => {
  const dispatch = useAppDispatch()
  const [selectMode, setSelectMode] = useState(false)
  const [selectedWords, setSelectedWords] = useState<{
    [key: number]: boolean
  }>({})
  const [longPressWord, setLongPressWord] = useState<VocabWord | null>(null)

  const words = useAppSelector(wordsSettingsModel.selectors.selectAllWords)

  useEffect(() => {
    dispatch(wordsSettingsModel.thunks.loadAllWords())
  }, [])

  const toggleSelectMode = () => {
    setSelectMode(selectMode => !selectMode)
    setSelectedWords({})
  }

  const handleShiftSelect = (startIndex: number, endIndex: number) => {
    const startMinIndex = Math.min(startIndex, endIndex)
    const startMaxIndex = Math.max(startIndex, endIndex)
    const newSelectedWords: {
      [key: number]: boolean
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
        {words.map(word => (
          <WordBlock
            key={word.id}
            word={word}
            selectMode={selectMode}
            isSelected={word.id in selectedWords}
            onLongPress={handleWordPress}
            onSingleSelect={handleSingleSelect}
          />
        ))}
      </div>
    </div>
  )
}
