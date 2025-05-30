import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  isAuth: boolean
}

const initialState: UserState = {
  isAuth: false,
}

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const actions = slice.actions
