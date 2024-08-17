/// <reference types="vite/client" />

import { type State, type Dispatch, type Thunk, type Store } from "./app/store"

declare type AppDispatch = Dispatch
declare type RootState = State
declare type AppThunk = Thunk
declare type AppStore = Store
