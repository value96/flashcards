import { useCallback, useEffect, useState } from 'react'
import { WordBlock } from './WordBlock'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { wordsSettingsModel } from '@entities/WordsSettings'
import { useSelect, useChangeStatus } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { Status } from '@shared/api'
import { Spinner } from '@shared/ui'

type VocabWord = wordsSettingsModel.types.VocabWord

export const WordsSettingsWidget = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  const [isSelectMode, setIsSelectMode] = useState(false)
  const words = useAppSelector(wordsSettingsModel.selectors.selectAllWords)
  const status = useAppSelector(state => state.wordsSettings.status)

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

  if (status === Status.loading) {
    return <Spinner />
  }

  return (
    <>
      <div className={styles.stickyHeader}>
        <div className={styles.buttonContainer}>
          <button className={styles.wordListButton} onClick={handleClose}>
            Закрыть
          </button>
          <button className={styles.wordListButton} onClick={toggleSelectMode}>
            {isSelectMode ? 'Отменить выбор' : 'Выбрать'}
          </button>

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
        </div>

        <div>
          {isSelectMode &&
            canChangeStatus &&
            `Выбрано: ${Object.keys(selectedWords).length} слов`}
          {isSelectMode && !canChangeStatus && (
            <div className={styles.caution}>
              выбранные слова должны быть одного статуса (одного цвета)!
            </div>
          )}
        </div>
      </div>
      <div className={styles.wordList}>
        {words.map((word, index) => (
          <WordBlock
            key={String(word.id)}
            index={index}
            word={word}
            isSelectMode={isSelectMode}
            isSelected={word.id in selectedWords}
            onPressDown={handlePressStart}
            onPressUp={handlePressEnd}
          />
        ))}
      </div>
    </>
  )
}
