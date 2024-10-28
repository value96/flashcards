import { createSlice } from "@reduxjs/toolkit"
import { initializeApp } from "./thunks"
import { Status } from "@shared/api"

interface AppState {
  status: Status
}

const initialState: AppState = {
  status: Status.idle,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initializeApp.pending, state => {
        state.status = Status.loading
      })
      .addCase(initializeApp.fulfilled, state => {
        state.status = Status.succeeded
      })
      .addCase(initializeApp.rejected, state => {
        state.status = Status.failed
      })
  },
})
