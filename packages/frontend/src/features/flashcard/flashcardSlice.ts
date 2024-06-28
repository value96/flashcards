import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { Word } from "@flashcards/types"
import { fetchWords, sendForgottenWord, sendRepeatedWord } from "./flashcardApi"
import { Status } from "../../types/Status"
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit"

//import { Status } from "../../types/enums"
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
    const data = await fetchWords(amount)
    return data
  },
)

// If you are not using async thunks you can use the standalone `createSlice`.
export const flashcardSlice = createSlice({
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
        flashcardAdapter.setAll(state, action.payload)
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
    try {
      const word = selectWordById(getState(), id)
      if (!word) throw new Error("Word not found")
      const res = await sendForgottenWord(word)
      console.log(`forgottenWord ${word.vocabWord.translate.eng} sent`)
      dispatch(removeWord(id))
    } catch (err) {
      alert(`${err}`)
    }
  }

export const repeatedWord =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const word = selectWordById(getState(), id)
      if (!word) throw new Error("Word not found")
      const res = await sendRepeatedWord(word)
      console.log(`repeatedWord ${word.vocabWord.translate.eng} sent`)
      dispatch(removeWord(id))
    } catch (err) {
      alert(`${err}`)
    }
  }

export const nextFlashcard =
  (amount: number): AppThunk =>
  async (dispatch, getState) => {
    const ids = selectWordIds(getState())
    const promises = ids.map(id => dispatch(repeatedWord(id)))
    await Promise.all(promises)
    await dispatch(loadWords(amount))
  }
