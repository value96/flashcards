import { axiosInstance, endpoints } from '@shared/api'

const { countWordsForPeriodUrl } = endpoints.wordsCounterEndpoints

interface GetCountWordsDTO {
  from?: string
  to?: string
}

export const fetchCountWordsForPeriod = ({
  from,
  to,
}: GetCountWordsDTO = {}) => {
  const params: Partial<Record<'from' | 'to', string>> = {}
  if (from) params.from = from
  if (to) params.to = to

  return axiosInstance
    .get<number>(countWordsForPeriodUrl, { params })
    .then(res => res.data)
}
