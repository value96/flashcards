import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { Word } from "@flashcards/types"
import { fetchWords } from "./flashcardApi"
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
        flashcardAdapter.addMany(state, action.payload)
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

export const sendForgottenWord =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(removeWord(id))
  }

export const sendRepeatedWord =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(removeWord(id))
  }

export const loadNextFlashcard =
  (amount: number): AppThunk =>
  async (dispatch, getState) => {
    const ids = selectWordIds(getState())
    for (const id of ids) {
      //send  remaining word as successfull
      await dispatch(sendRepeatedWord(id))
    }
    await dispatch(loadWords(amount))
    // load new words
  }
