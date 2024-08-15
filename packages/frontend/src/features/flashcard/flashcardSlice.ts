import type { PayloadAction, EntityState } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import type { Word } from "@flashcards/types"

import { Status } from "../../shared/api/statusEnums"
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import FlashcardService from "../../services/FlashcardService"

type FlashcardState = EntityState<Word, string> & {
  status: Status //"idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const flashcardAdapter = createEntityAdapter<Word>()

const initialState: FlashcardState = flashcardAdapter.getInitialState({
  status: Status.idle,
  error: null,
})

export const loadWords = createAsyncThunk(
  "flashcard/loadWords",
  async (amount: number) => {
    const res = await FlashcardService.fetchWords(amount)

    return res.data
  },
)

// If you are not using async thunks you can use the standalone `createSlice`.
const flashcardSlice = createSlice({
  name: "flashcard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addWord: flashcardAdapter.addOne,
    addWords: flashcardAdapter.addMany,
    updateWord: flashcardAdapter.updateOne,
    removeWord: flashcardAdapter.removeOne,
  },
  extraReducers: builder => {
    builder
      .addCase(loadWords.pending, state => {
        state.status = Status.loading
      })
      .addCase(loadWords.fulfilled, (state, action: PayloadAction<Word[]>) => {
        state.status = Status.succeeded
        console.log("setted Status.succeeded")
        flashcardAdapter.setAll(state, action.payload)
        console.log("seted All")
      })
      .addCase(loadWords.rejected, (state, action) => {
        state.status = Status.failed
        state.error = action.error.message || "Failed to load words"
      })
  },

  /* selectors: {
    selectWords: flashcard => flashcard.words,
  }, */
})

export const { addWord, addWords, updateWord, removeWord } =
  flashcardSlice.actions

//export const { selectWords } = flashcardSlice.selectors

export const {
  selectAll: selectAllWords,
  selectById: selectWordById,
  selectIds: selectWordIds,
} = flashcardAdapter.getSelectors((state: RootState) => state.flashcard)

export const forgottenWord =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const word = selectWordById(getState(), id)
    if (!word) throw new Error("Word not found")
    const res = await FlashcardService.sendForgottenWord(word)
    console.log(`forgottenWord ${word.vocabWord.translate.eng} sent`)
    dispatch(removeWord(id))
  }

export const repeatedWord =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const word = selectWordById(getState(), id)
    if (!word) throw new Error("Word not found")
    const res = await FlashcardService.sendRepeatedWord(word)
    console.log(`repeatedWord ${word.vocabWord.translate.eng} sent`)
    dispatch(removeWord(id))
  }

export const nextFlashcard =
  (amount: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      const ids = selectWordIds(getState())
      //const promises = []

      for (let id of ids) {
        await dispatch(repeatedWord(id))
        //await sleep(0.1)
      }
      //await Promise.all(promises)
      await dispatch(loadWords(amount))
    } catch (err) {
      alert(`${err}`)
    }
  }

export default flashcardSlice
