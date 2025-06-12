import { userModel } from '@entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const initializeApp = createAsyncThunk(
  'App/initialize',
  async (_, { dispatch }) => {
    dispatch(checkRefreshTokenExpiration())
  },
)

export const checkRefreshTokenExpiration = createAsyncThunk(
  'App/checkRefreshTokenExpiration',
  async (_, { dispatch }) => {
    const dateOfExpire = localStorage.getItem('refreshTokenExpiration')
    if (dateOfExpire) {
      try {
        if (new Date() < new Date(dateOfExpire)) {
          dispatch(userModel.actions.setAuth(true))
          return
        }
      } catch (e) {
        // не валидная строка
      }
    }
    localStorage.removeItem('refreshTokenExpiration')
    dispatch(userModel.actions.setAuth(false))
  },
)
