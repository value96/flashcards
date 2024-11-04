import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  isAuth: boolean
}

const initialState: UserState = {
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const actions = userSlice.actions
