import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAllWords,
  postAddNewWords,
  postChangeWordsStatus,
  postRemoveWords,
} from '../api'
import { VocabWord } from './types'
import { WordStatus } from '@shared/model'

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

export const addNewWords = createAsyncThunk<
  void,
  number[],
  { rejectValue: string }
>('wordsSettings/addNewWords', async (vocabWordsIds, { rejectWithValue }) => {
  try {
    return await postAddNewWords(vocabWordsIds)
  } catch (e: any) {
    return rejectWithValue(
      `Failed to add new words: ${e.response?.data?.error}`,
    )
  }
})

export const removeWords = createAsyncThunk<
  void,
  string[],
  { rejectValue: string }
>('wordsSettings/removeWords', async (wordIds, { rejectWithValue }) => {
  try {
    return await postRemoveWords(wordIds)
  } catch (e: any) {
    return rejectWithValue(`Failed to remove words: ${e.response?.data?.error}`)
  }
})

export const changeWordsStatus = createAsyncThunk<
  void,
  { wordIds: string[]; status: WordStatus },
  { rejectValue: string }
>(
  'wordsSettings/changeWordsStatus',
  async ({ wordIds, status }, { rejectWithValue }) => {
    try {
      return await postChangeWordsStatus({ wordIds, status })
    } catch (e: any) {
      return rejectWithValue(
        `Failed to change status words: ${e.response?.data?.error}`,
      )
    }
  },
)
