import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllWords } from '../api'
import { VocabWord } from './types'

export const loadAllWords = createAsyncThunk<
  VocabWord[],
  void,
  { rejectValue: string }
>('wordsSettings/loadAllWords', async (_, { rejectWithValue }) => {
  try {
    return await getAllWords()
  } catch (e: any) {
    return rejectWithValue(`Failed to load words: ${e.response?.data?.error}`)
  }
})
