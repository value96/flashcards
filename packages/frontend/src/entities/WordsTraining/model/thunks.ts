import { createAsyncThunk } from '@reduxjs/toolkit'
import { getNextBunchWords, getMp3File } from '../api'
import { WordAudio, WordsTraining } from './types'
import { selectWordsData } from './selectors'
import { RootState } from 'vite-env'

export const loadNextBunchWords = createAsyncThunk<
  WordsTraining[], // type of returned staff
  { count: number; isNeedSendRepeatedWords: boolean },
  // type of argument
  { state: RootState; rejectValue: string }
>(
  'wordsTraining/loadNextBunchWords',
  async ({ count, isNeedSendRepeatedWords }, { getState, rejectWithValue }) => {
    try {
      if (isNeedSendRepeatedWords) {
        const wordsData = selectWordsData(getState())
        return await getNextBunchWords({ count, wordsData })
      }
      return await getNextBunchWords({ count, wordsData: [] })
    } catch (e: any) {
      console.error(`Failed to load words: ${e.response?.data?.error}`)
      return rejectWithValue(`Failed to load words: ${e.response?.data?.error}`)
    }
  },
)
