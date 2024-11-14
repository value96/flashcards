import { axiosInstance, endpoints } from '@shared/api'
import { Word } from '@shared/model'
import { NextBunchWordsParams } from '../model/types'

export const getNextBunchWords = async (data: NextBunchWordsParams) => {
  return axiosInstance
    .post<Word[]>(endpoints.wordsTrainingEndpoints.nextBunchWordsUrl, data)
    .then(res => res.data)
}
