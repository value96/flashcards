import { axiosInstance, endpoints } from '@shared/api'
import { type WordsTraining } from '../model/types'

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

export const getMp3File = async (id: number) => {
  return axiosInstance
    .get<Blob>(endpoints.wordsTrainingEndpoints.mp3FileUrl + '?id=' + id, {
      responseType: 'blob',
    })
    .then(res => res.data)
}
