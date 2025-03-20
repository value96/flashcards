import { API_BASE_URL } from '@shared/config/env'
import axios from 'axios'
import { endpoints } from '@shared/api'
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(
          API_BASE_URL + endpoints.authEndpoints.refreshTokenUrl,
          {
            withCredentials: true,
          },
        )
        localStorage.setItem(
          'accessTokenExpiration',
          response.data.accessTokenExpiration.toString(),
        )
        return axiosInstance.request(originalRequest)
      } catch (e: any) {
        console.log('Not Auth')
      }
    }
    throw error
  },
)

/* const handleError = (err: AxiosError): void => {
  const errorMessage: string =
    (
      err.response?.data as {
        error?: string
      }
    ).error || "Unknown error"
  throw new Error(err.message + (errorMessage ? `: ${errorMessage}` : ""))
}

export interface ErrorResponse {
  error: string
}

export const postRequest = async (path: string, body: any = {}): Promise<any> =>
  instance
    .post(path, body)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      handleError(error)
    })

export const getRequest = async (path: string): Promise<any> =>
  instance
    .get(path)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      handleError(error)
    })
 */
