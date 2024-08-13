import type { AxiosResponse } from "axios"
import instance from "../shared/api/axiosInstance"

export default class AuthService {
  static async logout(): Promise<void> {
    return instance.post("/auth/logout")
  }
}
