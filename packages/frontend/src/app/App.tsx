import "./App.css"
import Flashcard from "../components/Flashcard/Flashcard"

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import { useEffect } from "react"

import { authModel } from "@features/Authorization"
import HomePage from "@pages/HomePage"
import { useAppDispatch, useAppSelector } from "@shared/store"
import { userModel } from "@entities/User"

const App = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(userModel.selectors.isAuth)
  const isRefreshTokenLoading = useAppSelector(
    authModel.selectors.isRefreshTokenLoading,
  )

  useEffect(() => {
    if (localStorage.getItem("accessTokenExpiration")) {
      dispatch(authModel.thunks.updateRefreshToken())
    }
  }, [])

  if (isRefreshTokenLoading) {
    return <div>Loading...</div>
  }

  if (isAuth)
    return (
      <ProtectedRoute>
        <h1>Flashcards</h1>
        {/* <Flashcard /> */}
      </ProtectedRoute>
    )

  return <HomePage />
}

export default App
