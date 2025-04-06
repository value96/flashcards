import { axiosInstance, endpoints } from '@shared/api'
import { type AxiosResponse } from 'axios'

interface signUpDTO {
  refreshTokenExpiration: string
  accessTokenExpiration: string
}

export const signUp = async (
  email: string,
  username: string,
  password: string,
) => {
  return axiosInstance
    .post<signUpDTO>(endpoints.authEndpoints.signUpUrl, {
      email,
      username,
      password,
    })
    .then(res => res.data)
}
