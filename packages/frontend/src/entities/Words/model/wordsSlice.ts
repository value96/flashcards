import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit"
import { Status } from "@shared/api"

import { Word } from "@shared/lib"

import { loadWords } from "./wordsThunks"

type WordsState = EntityState<Word, string> & {
  status: Status //"idle" | "loading" | "succeeded" | "failed"
  error: string | null
}
export const wordsAdapter = createEntityAdapter<Word>()

const initialState: WordsState = wordsAdapter.getInitialState({
  status: Status.idle,
  error: null,
})

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    addWord: wordsAdapter.addOne,
    addWords: wordsAdapter.addMany,
    updateWord: wordsAdapter.updateOne,
    removeWord: wordsAdapter.removeOne,
  },
  extraReducers: builder => {
    builder
      .addCase(loadWords.pending, state => {
        state.status = Status.loading
      })
      .addCase(loadWords.fulfilled, (state, action: PayloadAction<Word[]>) => {
        state.status = Status.succeeded
        console.log("setted Status.succeeded")
        wordsAdapter.setAll(state, action.payload)
        console.log("seted All")
      })
      .addCase(
        loadWords.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = Status.failed
          state.error = action.payload || "Failed to load words"
        },
      )
  },
})

export const { addWord, addWords, updateWord, removeWord } = wordsSlice.actions

export default wordsSlice
