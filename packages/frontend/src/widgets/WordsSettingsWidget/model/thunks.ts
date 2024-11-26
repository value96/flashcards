import { wordsSettingsModel } from '@entities/WordsSettings'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { WordStatus } from '@shared/model'

const { loadAllWords, addNewWords, removeWords, changeWordsStatus } =
  wordsSettingsModel.thunks

export const changeCategory = createAsyncThunk<
  void,
  {
    from: WordStatus | 'idle'
    to: WordStatus | 'idle'
    vocabWords: number[]
    wordIds: string[]
  },
  { rejectValue: string }
>(
  'WordsSettingsWidget/changeCategory',
  async ({ from, to, vocabWords, wordIds }, { dispatch, rejectWithValue }) => {
    try {
      if (from === 'idle' && to === 'learning') {
        await dispatch(addNewWords(vocabWords))
      }

      if (from === 'idle' && to === 'hasLearned') {
        /* await dispatch(addNewWords(vocabWords))
        await dispatch(changeWordsStatus())
        */
      }

      if (
        (from === 'learning' ||
          from === 'hasLearned' ||
          from === 'suspended') &&
        to === 'idle'
      ) {
        await dispatch(removeWords(wordIds))
      }

      if (from === 'learning' && to === 'hasLearned') {
        await dispatch(changeWordsStatus({ wordIds, status: 'hasLearned' }))
      }

      if (from === 'hasLearned' && to === 'learning') {
        await dispatch(changeWordsStatus({ wordIds, status: 'learning' }))
      }

      if (from === 'learning' && to === 'suspended') {
        await dispatch(changeWordsStatus({ wordIds, status: 'suspended' }))
      }

      if (from === 'suspended' && to === 'learning') {
        await dispatch(changeWordsStatus({ wordIds, status: 'learning' }))
      }

      if (from === 'suspended' && to === 'hasLearned') {
        await dispatch(changeWordsStatus({ wordIds, status: 'hasLearned' }))
      }

      await dispatch(loadAllWords())
      //return await //postRemoveWords(wordIds)
    } catch (e: any) {
      return rejectWithValue(
        `Failed to change words category: ${e.response?.data?.error}`,
      )
    }
  },
)
