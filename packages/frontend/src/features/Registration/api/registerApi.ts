import { axiosInstance, endpoints } from "@shared/api"
import { AxiosResponse } from "axios"

interface signUpDTO {
  accessTokenExpiration: string
}

export const signUp = async (
  email: string,
  username: string,
  password: string,
): Promise<AxiosResponse<signUpDTO>> => {
  return axiosInstance.post<signUpDTO>(endpoints.authEndpoints.signUp, {
    email,
    username,
    password,
  })
}
