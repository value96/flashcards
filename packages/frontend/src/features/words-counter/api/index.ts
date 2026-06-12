import { axiosInstance, endpoints } from '@shared/api'

const { countWordsForPeriodUrl, newWordsForecastUrl } =
  endpoints.wordsCounterEndpoints

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

export interface NewWordsForecast {
  horizonInDays: number
  dailyLimits: {
    comfortable: number
    aggressive: number
  }
  suggestedNewWords: {
    comfortable: number
    aggressive: number
  }
  existingReviewsByDay: number[]
  expectedReviewsPerNewWordByDay: number[]
}

export const fetchNewWordsForecast = () =>
  axiosInstance
    .get<NewWordsForecast>(newWordsForecastUrl)
    .then(res => res.data)
