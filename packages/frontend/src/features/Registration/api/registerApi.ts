import { axiosInstance } from "@shared/api"
import { AxiosResponse } from "axios"

export interface AuthResponseDTO {
  accessTokenExpiration: string
}

export const signUp = async (
  email: string,
  username: string,
  password: string,
): Promise<AxiosResponse<AuthResponseDTO>> => {
  return axiosInstance.post<AuthResponseDTO>("/auth/sign-up", {
    email,
    username,
    password,
  })
}
