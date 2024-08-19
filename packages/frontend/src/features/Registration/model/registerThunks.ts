import { createAsyncThunk } from "@reduxjs/toolkit"
import { signUp } from "../api/registerApi"
import { userModel } from "@entities/User"

interface SignUpData {
  username: string
  email: string
  password: string
}

export const register = createAsyncThunk(
  "Registration/register",
  async (
    { email, username, password }: SignUpData,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await signUp(email, username, password)
      localStorage.setItem(
        "accessTokenExpiration",
        response.data.accessTokenExpiration.toString(),
      )
      dispatch(userModel.actions.setAuth(true))
      return true
    } catch (e: any) {
      console.log(`Failed to sign up: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to sign up: ${e.response?.data?.error}`)
    }
  },
)
