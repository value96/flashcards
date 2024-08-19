import { axiosInstance, endpoints } from "@shared/api"

import { API_BASE_URL } from "@shared/config/env"
import axios, { AxiosResponse } from "axios"

interface AuthResponseDTO {
  accessTokenExpiration: string
}

export const signIn = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponseDTO>> => {
  return axiosInstance.post<AuthResponseDTO>(endpoints.authEndpoints.signIn, {
    email,
    password,
  })
}

export const refreshToken = async (): Promise<
  AxiosResponse<AuthResponseDTO>
> => {
  return await axios
    .get(API_BASE_URL + endpoints.authEndpoints.refreshToken, {
      withCredentials: true,
    })
    .then(res => res.data.accessTokenExpiration)
}
