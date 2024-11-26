import { axiosInstance, endpoints } from '@shared/api'

import { VocabWord } from '../model/types'
import { WordStatus } from '@shared/model'

export const getAllWords = async () => {
  return axiosInstance
    .get<VocabWord[]>(endpoints.wordsSettingsEndpoints.wordsListUrl)
    .then(res => res.data)
}

export const postAddNewWords = async (vocabWordsIds: number[]) => {
  return axiosInstance
    .post(endpoints.wordsSettingsEndpoints.addNewWordsUrl, vocabWordsIds)
    .then(res => res.data)
}

export const postRemoveWords = async (wordIds: string[]) => {
  return axiosInstance
    .post(endpoints.wordsSettingsEndpoints.removeWordsUrl, wordIds)
    .then(res => res.data)
}

export const postChangeWordsStatus = async (data: {
  wordIds: string[]
  status: WordStatus
}) => {
  return axiosInstance
    .post(endpoints.wordsSettingsEndpoints.changeWordsStatusUrl, data)
    .then(res => res.data)
}
