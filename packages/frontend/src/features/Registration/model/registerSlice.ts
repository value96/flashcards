import { createSlice } from "@reduxjs/toolkit"

import { Status } from "@shared/api"
import { register } from "./registerThunks"

interface RegisterState {
  status: Status
}

const initialState: RegisterState = {
  status: Status.idle
}

const registerSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, state => {
      state.status = Status.succeeded
    })
    builder.addCase(register.pending, state => {
      state.status = Status.loading
    })
    builder.addCase(register.rejected, state => {
      state.status = Status.failed
    })
  },
})

export default registerSlice
