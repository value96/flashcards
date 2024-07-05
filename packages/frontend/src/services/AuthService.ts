import type { AxiosResponse } from "axios"
import instance from "../api/api"
import type { AuthResponse } from "../models/Responses/AuthResponse"

export default class AuthService {
  static async signIn(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return instance.post<AuthResponse>("/auth/sign-in", { email, password })
  }
  static async signUp(
    email: string,
    username: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return instance.post<AuthResponse>("/auth/sign-up", {
      email,
      username,
      password,
    })
  }
  static async logout(): Promise<void> {
    return instance.post("/auth/logout")
  }
}
