import "./App.css"
import Flashcard from "./components/Flashcard/Flashcard"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import { useEffect, useState } from "react"
import {
  selectIsAuth,
  selectIsRefreshTokenLoading,
} from "./features/auth/authSlice"
import { checkAuth } from "./features/auth/authThunks"
import HomePage from "./pages/HomePage/HomePage"

const App = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const isRefreshTokenLoading = useAppSelector(selectIsRefreshTokenLoading)

  useEffect(() => {
    if (localStorage.getItem("accessTokenExpiration")) {
      dispatch(checkAuth())
    }
  }, [])

  if (isRefreshTokenLoading) {
    return <div>Loading...</div>
  }

  if (isAuth)
    return (
      <ProtectedRoute>
        <Flashcard />
      </ProtectedRoute>
    )

  return <HomePage />
}

export default App
