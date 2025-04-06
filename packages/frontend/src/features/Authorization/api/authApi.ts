import { axiosInstance, endpoints } from '@shared/api'

import { API_BASE_URL } from '@shared/config/env'
import axios from 'axios'

const { signInUrl, refreshTokenUrl, logoutUrl } = endpoints.authEndpoints

interface AuthResponseDTO {
  refreshTokenExpiration: string
  accessTokenExpiration: string
}

export const signInReq = async (email: string, password: string) => {
  return axiosInstance
    .post<AuthResponseDTO>(signInUrl, {
      email,
      password,
    })
    .then(res => res.data)
}

/* export const refreshTokenReq = async () => {
  return await axios
    .get<AuthResponseDTO>(API_BASE_URL + refreshTokenUrl, {
      withCredentials: true,
    })
    .then(res => res.data.accessTokenExpiration)
} */

export const logoutReq = async () => {
  return axiosInstance.post<{}>(logoutUrl)
}
