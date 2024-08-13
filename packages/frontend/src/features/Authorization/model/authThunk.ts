import { createAsyncThunk } from "@reduxjs/toolkit"
import { signIn } from "../api/loginApi"

export interface SignInData {
  email: string
  password: string
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: SignInData, { rejectWithValue }) => {
    try {
      const response = await signIn(email, password)
      localStorage.setItem(
        "accessTokenExpiration",
        response.data.accessTokenExpiration.toString(),
      )
      return true
    } catch (e: any) {
      console.log(`Failed to sign in: ${e.response?.data?.error}`)
      alert(`Failed to sign in: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to sign in: ${e.response?.data?.error}`)
    }
  },
)
