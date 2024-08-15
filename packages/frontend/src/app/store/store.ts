import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { userSlice } from "entities/User"

const rootReducer = combineSlices(userSlice)

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

export type AppStore = typeof store
export type Dispatch = AppStore["dispatch"]
export type Thunk<ThunkReturnType = void> = ThunkAction<
  Promise<ThunkReturnType>,
  State,
  unknown,
  Action
>
