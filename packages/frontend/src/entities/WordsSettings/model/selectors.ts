import { RootState } from 'vite-env'

export const selectAllWords = (state: RootState) => state.wordsSettings.words
export const selectWordsSettingsStatus = (state: RootState) =>
  state.wordsSettings.status
