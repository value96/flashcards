import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { loadNextBunchWords } from './thunks'
import { type WordsTraining } from './types'

const initialState: (WordsTraining & {
  isSuccessRepeated: boolean
})[] = []

export const slice = createSlice({
  name: 'wordsTraining',
  initialState,
  reducers: {
    forgot(state, action: PayloadAction<string>) {
      const word = state.find(word => word._id === action.payload)
      if (word) {
        word.isSuccessRepeated = !word.isSuccessRepeated
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(
      loadNextBunchWords.fulfilled,
      (_, action: PayloadAction<WordsTraining[]>) => {
        return action.payload.map(word => ({
          ...word,
          isSuccessRepeated: true,
          audio: null,
        }))
      },
    )
  },
})
