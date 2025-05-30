import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getCountWordsForUntilTomorrow } from './thunks'

interface CounterState {
  repeatedWordsWithinSession: number
  countWordsToRepeatToday: number | null
}

const initialState: CounterState = {
  repeatedWordsWithinSession: 0,
  countWordsToRepeatToday: null,
}

export const slice = createSlice({
  name: 'words-counter',
  initialState,
  reducers: {
    increase(state, action: PayloadAction<number>) {
      state.repeatedWordsWithinSession += action.payload
    },
  },
  selectors: {
    repeatedWordsWithinSession: state => state.repeatedWordsWithinSession,
    countWordsToRepeatToday: state => state.countWordsToRepeatToday,
  },
  extraReducers: builder => {
    builder.addCase(
      getCountWordsForUntilTomorrow.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.countWordsToRepeatToday = action.payload
      },
    )
  },
})

export const actions = { ...slice.actions }
export const selectors = { ...slice.selectors }
