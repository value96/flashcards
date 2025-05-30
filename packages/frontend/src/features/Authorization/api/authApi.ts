import { axiosInstance, endpoints } from '@shared/api'

const { signInUrl, logoutUrl } = endpoints.authEndpoints

interface AuthResponseDTO {
  refreshTokenExpiration: string
  accessTokenExpiration: string
}

export const signInReq = (email: string, password: string) =>
  axiosInstance
    .post<AuthResponseDTO>(signInUrl, {
      email,
      password,
    })
    .then(res => res.data)

export const logoutReq = () => {
  return axiosInstance.post<{}>(logoutUrl)
}
