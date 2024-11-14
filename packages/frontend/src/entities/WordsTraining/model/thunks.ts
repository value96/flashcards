import { createAsyncThunk } from '@reduxjs/toolkit'
import { getNextBunchWords } from '../api'
import { Word } from '@shared/model'
import { NextBunchWordsParams } from './types'

export const loadNextBunchWords = createAsyncThunk<
  Word[], // type of returned staff
  NextBunchWordsParams, // type of argument
  { rejectValue: string }
>(
  'wordsTraining/loadNextBunchWords',
  async (data: NextBunchWordsParams, { rejectWithValue }) => {
    try {
      return await getNextBunchWords(data)
    } catch (e: any) {
      console.error(`Failed to load words: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to load words: ${e.response?.data?.error}`)
    }
  },
)
