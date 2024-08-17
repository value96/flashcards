import { createAsyncThunk } from "@reduxjs/toolkit"
import { refreshToken, signIn } from "../api/loginApi"
import { userModel } from "@entities/User"

export const updateRefreshToken = createAsyncThunk<
  true,
  void,
  { rejectValue: string }
>("refreshToken", async (_, { rejectWithValue }) => {
  try {
    console.log("refreshToken start")
    const accessTokenExpiration = await refreshToken()
    localStorage.setItem(
      "accessTokenExpiration",
      accessTokenExpiration.toString(),
    )
    return true
  } catch (e: any) {
    console.log(`Failed to refresh token: ${e.response?.data?.error}`)
    return rejectWithValue(
      `Failed to refresh token: ${e.response?.data?.error}`,
    )
  }
})

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
      dispatch(userModel.actions.setAuth(true))
      return true
    } catch (e: any) {
      console.log(`Failed to sign in: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to sign in: ${e.response?.data?.error}`)
    }
  },
)
