import { createAsyncThunk } from "@reduxjs/toolkit"
import { signIn } from "../api/loginApi"
import { setAuth } from "entities/User/model/userSlice"

interface SignInData {
  email: string
  password: string
}

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: SignInData, { rejectWithValue, dispatch }) => {
    try {
      const response = await signIn(email, password)
      localStorage.setItem(
        "accessTokenExpiration",
        response.data.accessTokenExpiration.toString(),
      )
      dispatch(setAuth(true))
      return true
    } catch (e: any) {
      console.log(`Failed to sign in: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to sign in: ${e.response?.data?.error}`)
    }
  },
)
