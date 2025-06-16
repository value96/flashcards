import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'vite-env'

export const selectAllWords = (state: RootState) => state.wordsSettings.words
export const selectWordsSettingsStatus = (state: RootState) =>
  state.wordsSettings.status

export const selectLearningWordsCount = createSelector(
  [selectAllWords],
  words => words.filter(w => w.word?.status === 'learning').length,
)

export const selectLearnedWordsCount = createSelector(
  [selectAllWords],
  words => words.filter(w => w.word?.status === 'hasLearned').length,
)
