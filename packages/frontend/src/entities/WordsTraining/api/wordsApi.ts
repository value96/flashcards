import { axiosInstance, endpoints } from '@shared/api'
import { WordsTraining } from '../model/types'

export type NextBunchWordsParams = {
  count: number
  wordsData: { wordId: string; isSuccessRepeated: boolean }[]
}

export const getNextBunchWords = async (data: NextBunchWordsParams) => {
  return axiosInstance
    .post<
      WordsTraining[]
    >(endpoints.wordsTrainingEndpoints.nextBunchWordsUrl, data)
    .then(res => res.data)
}
