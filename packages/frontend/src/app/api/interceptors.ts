import { axiosInstance, endpoints } from '@shared/api'
import { store } from '../store'
import axios, { type AxiosResponse } from 'axios'
import { userModel } from '@entities/User'

interface AuthResponseDTO {
  refreshTokenExpiration: string
  accessTokenExpiration: string
}

let isRefreshing = false
let refreshPromise: Promise<AxiosResponse<AuthResponseDTO>> | null = null
const queued: Array<(error?: any) => void> = []

axiosInstance.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true

      return new Promise((resolve, reject) => {
        queued.push(async (err?: any) => {
          if (err) {
            reject(err)
            return
          }
          try {
            const res = await axiosInstance.request(originalRequest)
            resolve(res)
          } catch (requestErr) {
            reject(requestErr)
          }
        })

        if (!isRefreshing) {
          isRefreshing = true
          refreshPromise = axios.get<
            AuthResponseDTO,
            AxiosResponse<AuthResponseDTO>
          >('/api' + endpoints.authEndpoints.refreshTokenUrl, {
            withCredentials: true,
          })

          refreshPromise
            .then(response => {
              localStorage.setItem(
                'accessTokenExpiration',
                response.data.accessTokenExpiration.toString(),
              )
              const callbacks = [...queued]
              queued.length = 0
              callbacks.forEach(cb => cb())
            })
            .catch((refreshError: any) => {
              localStorage.removeItem('refreshTokenExpiration')
              localStorage.removeItem('accessTokenExpiration')
              store.dispatch(userModel.actions.setAuth(false))
              const callbacks = [...queued]
              queued.length = 0
              callbacks.forEach(cb => cb(refreshError))
            })
            .finally(() => {
              isRefreshing = false
              refreshPromise = null
            })
        }
      })
    }
    return Promise.reject(error)
  },
)
