import { axiosInstance, endpoints } from '@shared/api'

const { signInUrl, logoutUrl } = endpoints.authEndpoints

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

export const logoutReq = async () => {
  return axiosInstance.post<{}>(logoutUrl)
}
