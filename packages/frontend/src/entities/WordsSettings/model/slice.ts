import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Status } from '@shared/api'
import { loadAllWords } from './thunks'

import { VocabWord } from './types'

export type WordsSettings = {
  words: VocabWord[]
  status: Status
  error: string | null
}

const initialState: WordsSettings = {
  words: [],
  status: Status.idle,
  error: null,
}

export const slice = createSlice({
  name: 'wordsSettings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadAllWords.pending, state => {
        state.status = Status.loading
      })
      .addCase(
        loadAllWords.fulfilled,
        (state, action: PayloadAction<VocabWord[]>) => {
          state.status = Status.succeeded
          state.words = action.payload
        },
      )
      .addCase(loadAllWords.rejected, (state, action) => {
        state.status = Status.failed
        state.error = action.payload || 'Failed to load words'
      })
  },
})

//export const { addWord, addWords, updateWord, removeWord } = slice.actions
