import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCountWordsForPeriod } from '../api'
import { getTomorrowUTCString } from '../utils'

export const getCountWordsForUntilTomorrow = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>('words-counter/getCountWordsForPeriod', async (_, { rejectWithValue }) => {
  try {
    return await fetchCountWordsForPeriod({ to: getTomorrowUTCString() })
  } catch (e: any) {
    console.error(
      `Failed to get countWordsForPeriod: ${e.response?.data?.error}`,
    )
    return rejectWithValue(
      `Failed to get countWordsForPeriod: ${e.response?.data?.error}`,
    )
  }
})
