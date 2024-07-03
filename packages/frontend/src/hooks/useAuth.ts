import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectIsAuth, setAuth } from "../features/auth/authSlice"
import { checkAuth } from "../features/auth/authThunks"

const useAuth = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuth)
  console.log("useAuth")

  /*   const expirationDate = localStorage.getItem("accessTokenExpiration")
  if (expirationDate && new Date(expirationDate) > new Date()) {
    dispatch(setAuthenticated(true))
  } */

  useEffect(() => {
    console.log("useAuth -> useEffect")
    const expirationDate = localStorage.getItem("accessTokenExpiration")
    if (expirationDate && new Date(expirationDate) > new Date()) {
      dispatch(setAuth(true))
      setTimeout(
        () => {
          dispatch(checkAuth())
        },
        new Date(expirationDate).getTime() - Date.now() - 5000,
      )
    } else {
      dispatch(checkAuth())
    }

    /* const interval = setInterval(() => {
      dispatch(refreshToken())
    }, ) // Проверяем каждые 60 секунд

    return () => clearInterval(interval) */
  }, [])

  return isAuthenticated
}

export default useAuth
