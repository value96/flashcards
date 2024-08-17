import { axiosInstance } from "@shared/api"
import { API_ENDPOINTS } from "@shared/config"
import { API_BASE_URL } from "@shared/config/env"
import axios, { AxiosResponse } from "axios"

interface AuthResponseDTO {
  accessTokenExpiration: string
}

export const signIn = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponseDTO>> => {
  return axiosInstance.post<AuthResponseDTO>(API_ENDPOINTS.signIn, {
    email,
    password,
  })
}

export const refreshToken = async (): Promise<
  AxiosResponse<AuthResponseDTO>
> => {
  return await axios
    .get(API_BASE_URL + API_ENDPOINTS.refreshToken, {
      withCredentials: true,
    })
    .then(res => res.data.accessTokenExpiration)
}
