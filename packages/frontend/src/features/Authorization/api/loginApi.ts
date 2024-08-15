import { axiosInstance } from "@shared/api"
import { AxiosResponse } from "axios"

interface AuthResponseDTO {
  accessTokenExpiration: string
}

export const signIn = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponseDTO>> => {
  return axiosInstance.post<AuthResponseDTO>("/auth/sign-in", {
    email,
    password,
  })
}
