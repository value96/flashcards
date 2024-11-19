import { RootState } from 'vite-env'

export const selectAllWords = (state: RootState) => state.wordsTraining
export const selectWordsData = (state: RootState) =>
  state.wordsTraining.map(word => ({
    wordId: word._id,
    isSuccessRepeated: word.isSuccessRepeated,
  }))
