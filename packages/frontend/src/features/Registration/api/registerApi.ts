import { axiosInstance } from "@shared/api"
import { API_ENDPOINTS } from "@shared/config"
import { AxiosResponse } from "axios"

interface AuthResponseDTO {
  accessTokenExpiration: string
}

export const signUp = async (
  email: string,
  username: string,
  password: string,
): Promise<AxiosResponse<AuthResponseDTO>> => {
  return axiosInstance.post<AuthResponseDTO>(API_ENDPOINTS.signUp, {
    email,
    username,
    password,
  })
}
