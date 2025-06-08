import { axiosInstance, endpoints } from '@shared/api'
import { store } from '../store'
import axios from 'axios'
import { userModel } from '@entities/User'

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
      try {
        const response = await axios.get(
          '/api' + endpoints.authEndpoints.refreshTokenUrl,
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
        if (
          e.response &&
          (e.response.status === 401 || e.response.status === 404)
        ) {
          localStorage.removeItem('refreshTokenExpiration')
          localStorage.removeItem('accessTokenExpiration')
          store.dispatch(userModel.actions.setAuth(false))
        } else {
          console.error('Ошибка при обновлении токена:', e)
        }
      }
    }
    return Promise.reject(error)
  },
)
