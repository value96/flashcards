import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Word } from '@shared/model'
import { loadNextBunchWords } from './thunks'

const initialState: Word[] = []

export const slice = createSlice({
  name: 'wordsTraining',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadNextBunchWords.fulfilled,
      (state, action: PayloadAction<Word[]>) => {
        state = action.payload
      },
    )
  },
})
