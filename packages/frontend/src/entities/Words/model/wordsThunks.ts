import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchWords } from "../api/wordsApi"

export const loadWords = createAsyncThunk(
  "Words/loadWords",
  async (count: number): Promise<Word> => {
    try {
      const res = await fetchWords(count)
      return res.data
    } catch (e: any) {
      alert(`Failed to load words: ${e.response?.data?.error}`)
    }
  },
)
