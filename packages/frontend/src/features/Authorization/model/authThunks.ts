import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInReq, logoutReq } from '../api'
import { userModel } from '@entities/User'

const { setAuth } = userModel.actions

/* export const updateRefreshToken = createAsyncThunk<
  true,
  void,
  { rejectValue: string }
>('Authorization/refreshToken', async (_, { rejectWithValue, dispatch }) => {
  try {
    console.log('refreshToken start')
    const accessTokenExpiration = await refreshTokenReq()
    localStorage.setItem(
      'accessTokenExpiration',
      accessTokenExpiration.toString(),
    )
    dispatch(setAuth(true))
    return true
  } catch (e: any) {
    dispatch(setAuth(false))
    console.error(`Failed to refresh token: ${e.response?.data?.error}`)
    localStorage.removeItem('accessTokenExpiration')
    return rejectWithValue(
      `Failed to refresh token: ${e.response?.data?.error}`,
    )
  }
}) */

interface SignInData {
  email: string
  password: string
}

export const login = createAsyncThunk(
  'Authorization/login',
  async ({ email, password }: SignInData, { rejectWithValue, dispatch }) => {
    try {
      const data = await signInReq(email, password)
      localStorage.setItem(
        'refreshTokenExpiration',
        data.refreshTokenExpiration,
      )
      localStorage.setItem('accessTokenExpiration', data.accessTokenExpiration)
      dispatch(setAuth(true))
      return true
    } catch (e) {
      console.error(`Failed to to sign in: ${e}`)
      return rejectWithValue(`Failed to sign in: ${e}`)
    }
  },
)

export const logout = createAsyncThunk(
  'Authorization/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      localStorage.removeItem('refreshTokenExpiration')
      localStorage.removeItem('accessTokenExpiration')
      dispatch(setAuth(false))
      // сделаем так чтобы разлогин происходил не зависимо от бэкэнда
      /* await */ logoutReq()
    } catch (e) {
      console.error(`Failed to logout: ${e}`)
      return rejectWithValue(`Failed to logout: ${e}`)
    }
  },
)
