import { useCallback, useEffect, useState } from 'react'
import { WordBlock } from './WordBlock'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { wordsSettingsModel } from '@entities/WordsSettings'
import { useSelect, useChangeStatus } from '../hooks'
import { useNavigate } from 'react-router-dom'

type VocabWord = wordsSettingsModel.types.VocabWord

export const WordsSettingsWidget = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  const [isSelectMode, setIsSelectMode] = useState(false)
  const words = useAppSelector(wordsSettingsModel.selectors.selectAllWords)

  useEffect(() => {
    dispatch(wordsSettingsModel.thunks.loadAllWords())
  }, [])

  const toggleSelectMode = () => {
    setIsSelectMode(prev => !prev)
    resetSelectedWords()
  }

  const openContextMenu = useCallback((id: string) => {
    // при долгом нажатии без select mode
    console.log(`Долгий клик для: ${id}`)
  }, [])

  const handleFastClick = useCallback((id: string) => {
    // Ваш код для быстрого клика
    console.log(`Быстрый клик для: ${id}`)
  }, [])

  const {
    selectedItems: selectedWords,
    handlePressStart,
    handlePressEnd,
    reset: resetSelectedWords,
  } = useSelect<VocabWord>(
    isSelectMode,
    handleFastClick,
    openContextMenu,
    words,
  )

  const { changeStatusButtons, canChangeStatus } = useChangeStatus(
    words,
    selectedWords,
  )

  return (
    <div>
      <button className={styles.wordListButton} onClick={handleClose}>
        close
      </button>
      <button className={styles.wordListButton} onClick={toggleSelectMode}>
        {isSelectMode ? 'Cancel Selection' : 'Select'}
      </button>

      {/* {isSelectMode && Object.keys(selectedWords).length > 0 && (
        <button className={styles.wordListButton}>Change Status</button>
      )} */}

      {isSelectMode &&
        changeStatusButtons.map((button, index) => (
          <button
            key={index}
            className={styles.wordListButton}
            onClick={button.onClick}
          >
            {button.text}
          </button>
        ))}

      {isSelectMode &&
        canChangeStatus &&
        `Chosen: ${Object.keys(selectedWords).length} words.`}
      {isSelectMode && !canChangeStatus && (
        <span className={styles.caution}>
          'all words must have the same status!'
        </span>
      )}
      <div className={styles.wordList}>
        {words.map(word => (
          <WordBlock
            key={String(word.id)}
            word={word}
            isSelectMode={isSelectMode}
            isSelected={word.id in selectedWords}
            onPressDown={handlePressStart}
            onPressUp={handlePressEnd}
          />
        ))}
      </div>
    </div>
  )
}
