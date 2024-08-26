import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchWords } from "../api/wordsApi"
import { Word } from "@shared/lib"
export const loadWords = createAsyncThunk<
  Word[], // type of returned staff
  number, // type of argument
  { rejectValue: string }
>("Words/loadWords", async (count: number, { rejectWithValue }) => {
  try {
    const res = await fetchWords(count)
    return res.data
  } catch (e: any) {
    alert(`Failed to load words: ${e.response?.data?.error}`)
    return rejectWithValue(`Failed to load words: ${e.response?.data?.error}`)
  }
})
