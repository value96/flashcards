import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { login } from "./authThunk"

interface AuthState {
  isAuth: boolean
}

const initialState: AuthState = {
  isAuth: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, state => {
      state.isAuth = true
    })
  },
})

export default authSlice.reducer
