import { userModel } from '@entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const initializeApp = createAsyncThunk(
  'App/initialize',
  async (_, { dispatch }) => {
    dispatch(checkAccessTokenExpiration())
  },
)

export const checkAccessTokenExpiration = createAsyncThunk(
  'App/checkAccessTokenExpiration',
  async (_, { dispatch }) => {
    const dateOfExpire = localStorage.getItem('accessTokenExpiration')
    if (dateOfExpire) {
      try {
        if (new Date() < new Date(JSON.parse(dateOfExpire))) {
          dispatch(userModel.actions.setAuth(true))
          return
        }
      } catch (e) {
        // не валидная строка
      }
    }
    localStorage.removeItem('accessTokenExpiration')
    dispatch(userModel.actions.setAuth(false))
  },
)
