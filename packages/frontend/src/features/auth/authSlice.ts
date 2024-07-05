// src/features/auth/authSlice.js
import type { PayloadAction} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import { signIn, signUp, checkAuth, logout } from "./authThunks"

import type { RootState } from "../../app/store"

type AuthState = {
  isAuth: boolean
  isSignInLoading: boolean
  isSignUpPLoading: boolean
  isRefreshTokenLoading: boolean
  refreshTokenError: string | null
  signInError: string | null
  signUpError: string | null
}

const initialState: AuthState = {
  isAuth: false,
  isSignInLoading: false,
  isSignUpPLoading: false,
  isRefreshTokenLoading: false,
  refreshTokenError: null,
  signInError: null,
  signUpError: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.isSignInLoading = true
        state.signInError = null
      })
      .addCase(signIn.fulfilled, state => {
        state.isSignInLoading = false
        state.isAuth = true
        state.signInError = null
      })
      .addCase(
        signIn.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isSignInLoading = false
          state.signInError = action.payload ?? "Unknown error occurred"
        },
      )
      .addCase(signUp.pending, state => {
        state.isSignUpPLoading = true
        state.signUpError = null
      })
      .addCase(signUp.fulfilled, state => {
        state.isSignUpPLoading = false
        state.isAuth = true
        state.signUpError = null
      })
      .addCase(
        signUp.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isSignUpPLoading = false
          state.signUpError = action.payload ?? "Unknown error occurred"
        },
      )
      .addCase(logout.fulfilled, state => {
        state.isAuth = false
      })
      .addCase(logout.rejected, state => {
        state.isAuth = false
      })

      .addCase(checkAuth.pending, state => {
        state.isRefreshTokenLoading = true
        state.refreshTokenError = null
      })
      .addCase(checkAuth.fulfilled, state => {
        state.isRefreshTokenLoading = false
        state.isAuth = true
        state.refreshTokenError = null
      })
      .addCase(
        checkAuth.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isRefreshTokenLoading = false
          state.isAuth = false
          state.refreshTokenError = action.payload ?? "Unknown error occurred"
        },
      )
  },
  /* selectors: {
    isAuthenticated: auth => auth.isAuthenticated,
    signInProcessLoading: auth => auth.signInProcessLoading,
    signUpProcessLoading: auth => auth.signUpProcessLoading,
    refreshTokenLoading: auth => auth.refreshTokenLoading,
    refreshTokenError: auth => auth.refreshTokenError,
    signInError: auth => auth.signInError,
    signUpError: auth => auth.signUpError,
  }, */
})

export const { setAuth: setAuthenticated } = authSlice.actions
//export const {isAuthenticated} = authSlice.selectors

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectSignInProcessLoading = (state: RootState) =>
  state.auth.isSignInLoading
export const selectSignUpProcessLoading = (state: RootState) =>
  state.auth.isSignUpPLoading
export const selectIsRefreshTokenLoading = (state: RootState) =>
  state.auth.isRefreshTokenLoading
export const selectRefreshTokenError = (state: RootState) =>
  state.auth.refreshTokenError
export const selectSignInError = (state: RootState) => state.auth.signInError
export const selectSignUpError = (state: RootState) => state.auth.signUpError

export default authSlice
