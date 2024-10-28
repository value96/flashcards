import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { userModel } from "@entities/User"
import { authModel } from "@features/Authorization"
import { wordsModel } from "@entities/Words"
import { appSlice } from "./appSlice"

const rootReducer = combineSlices(
  appSlice,
  userModel.slice,
  authModel.slice,
  wordsModel.slice,
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
export type Dispatch = Store["dispatch"]
export type Thunk<ThunkReturnType = void> = ThunkAction<
  Promise<ThunkReturnType>,
  State,
  unknown,
  Action
>
