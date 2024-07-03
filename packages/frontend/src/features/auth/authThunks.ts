// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit"
import { API_URL, instance } from "../../api/api"
import axios, { AxiosResponse } from "axios"
import AuthService from "../../services/AuthService"
import { AuthResponse } from "../../models/Responses/AuthResponse"

export interface SignInData {
  email: string
  password: string
}

export interface SignUpData {
  username: string
  email: string
  password: string
}

interface Response {
  accessTokenExpiration: Date
}

export const checkAuth = createAsyncThunk<true, void, { rejectValue: string }>(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      console.log("refreshToken start")
      const response = await axios.get(`${API_URL}auth/refresh-token`, {
        withCredentials: true,
      })
      console.log(`${response}`)
      const accessTokenExpiration = response.data.accessTokenExpiration

      localStorage.setItem(
        "accessTokenExpiration",
        accessTokenExpiration.toString(),
      )

      /* setTimeout(
        () => {
          dispatch(checkAuth())
        },
        accessTokenExpiration.getTime() - Date.now() - 5000,
      ) */
      return true
    } catch (e: any) {
      console.log(`Failed to refresh token: ${e.response?.data?.error}`)
      return rejectWithValue(
        `Failed to refresh token: ${e.response?.data?.error}`,
      )
    }
  },
)

export const signIn = createAsyncThunk<
  true,
  SignInData,
  { rejectValue: string }
>(
  "auth/signIn",
  async ({ email, password }: SignInData, { rejectWithValue }) => {
    try {
      const response = await AuthService.signIn(email, password)

      localStorage.setItem(
        "accessTokenExpiration",
        response.data.accessTokenExpiration.toString(),
      )
      return true
    } catch (e: any) {
      console.log(`Failed to sign in: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to sign in: ${e.response?.data?.error}`)
    }
  },
)

export const signUp = createAsyncThunk<
  true,
  SignUpData,
  { rejectValue: string }
>(
  "auth/signUp",
  async ({ email, username, password }: SignUpData, { rejectWithValue }) => {
    try {
      const response = await AuthService.signUp(email, username, password)
      localStorage.setItem(
        "accessTokenExpiration",
        response.data.accessTokenExpiration.toString(),
      )
      return true
    } catch (e: any) {
      console.log(`Failed to sign up: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to sign up: ${e.response?.data?.error}`)
    }
  },
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem("accessTokenExpiration")
    } catch (e: any) {
      console.log(`Failed to logout: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to logout: ${e.response?.data?.error}`)
    }
  },
)
