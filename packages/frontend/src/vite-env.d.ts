/// <reference types="vite/client" />

import { State, Dispatch, Thunk } from "./app/store"

declare type RootState = State
declare type AppDispatch = Dispatch
declare type AppThunk = Thunk
