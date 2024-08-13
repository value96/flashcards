import { useState } from "react"

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await loginApi(username, password)
      // Дальнейшие действия после успешного логина
    } catch (err) {
      setError("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return { login, error, isLoading }
}
