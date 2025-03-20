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
    if (localStorage.getItem('accessTokenExpiration')) {
      // проверить не истекла ли дата?

      dispatch(userModel.actions.setAuth(true))
    }
  },
)
