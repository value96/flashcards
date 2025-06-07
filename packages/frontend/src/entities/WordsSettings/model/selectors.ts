import { RootState } from 'vite-env'

export const selectAllWords = (state: RootState) => state.wordsSettings.words
export const selectStatus = (state: RootState) => state.wordsSettings.status
