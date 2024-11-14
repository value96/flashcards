import { axiosInstance, endpoints } from '@shared/api'

import { VocabWord } from '../model/types'

export const getAllWords = async () => {
  return axiosInstance
    .get<VocabWord[]>(endpoints.wordsSettingsEndpoints.wordsListUrl)
    .then(res => res.data)
}
