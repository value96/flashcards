import { createSlice } from '@reduxjs/toolkit'
import { login /* updateRefreshToken */ } from './authThunks'
import { Status } from '@shared/api'

interface AuthState {
  authProcessStatus: Status
  refreshTokenProcessStatus: Status
}

const initialState: AuthState = {
  authProcessStatus: Status.idle,
  refreshTokenProcessStatus: Status.idle,
}

export const slice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, state => {
      state.authProcessStatus = Status.succeeded
    })
    builder.addCase(login.pending, state => {
      state.authProcessStatus = Status.loading
    })
    builder.addCase(login.rejected, state => {
      state.authProcessStatus = Status.failed
    })
    /* builder.addCase(updateRefreshToken.fulfilled, state => {
      state.refreshTokenProcessStatus = Status.succeeded
    })
    builder.addCase(updateRefreshToken.pending, state => {
      state.refreshTokenProcessStatus = Status.loading
    })
    builder.addCase(updateRefreshToken.rejected, state => {
      state.refreshTokenProcessStatus = Status.failed
    }) */
  },
})
