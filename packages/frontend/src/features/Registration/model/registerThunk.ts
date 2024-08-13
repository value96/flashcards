import { createAsyncThunk } from "@reduxjs/toolkit"
import { signUp } from "../api/registerApi"
export interface SignUpData {
  username: string
  email: string
  password: string
}

export const register = createAsyncThunk<
  true,
  SignUpData,
  { rejectValue: string }
>(
  "auth/signUp",
  async ({ email, username, password }: SignUpData, { rejectWithValue }) => {
    try {
      const response = await signUp(email, username, password)
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
