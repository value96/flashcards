import { axiosInstance, endpoints } from "@shared/api"

import { AxiosResponse } from "axios"
import { Word } from "@shared/lib"

export const fetchWords = async (
  count: number,
): Promise<AxiosResponse<Word[]>> => {
  return axiosInstance.get<Word[]>(
    endpoints.wordsEndpoints.fetchWords + "/" + count.toString(),
  )
}
