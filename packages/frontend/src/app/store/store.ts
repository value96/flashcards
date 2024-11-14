import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appSlice } from './appSlice'
import { authModel } from '@features/Authorization'
import { userModel } from '@entities/User'
import { wordsSettingsModel } from '@entities/WordsSettings'
import { wordsTrainingModel } from '@entities/WordsTraining'

const rootReducer = combineSlices(
  appSlice,
  userModel.userSlice,
  authModel.authSlice,
  wordsSettingsModel.slice,
  wordsTrainingModel.slice,
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
