import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appSlice } from './appSlice'
import { authModel } from '@features/Authorization'
import { userModel } from '@entities/User'
import { wordsSettingsModel } from '@entities/WordsSettings'
import { wordsTrainingModel } from '@entities/WordsTraining'
import { wordsCounterModel } from '@features/words-counter'
import { registerModel } from '@features/Registration'

const rootReducer = combineSlices(
  appSlice,
  userModel.slice,
  authModel.slice,
  registerModel.slice,
  wordsSettingsModel.slice,
  wordsTrainingModel.slice,
  wordsCounterModel.slice,
)

export type State = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<State>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type Store = typeof store
export type Dispatch = Store['dispatch']
export type Thunk<ThunkReturnType = void> = ThunkAction<
  Promise<ThunkReturnType>,
  State,
  unknown,
  Action
>
