import "./App.css"

import { ProtectedRoute } from "./routers"
import { useEffect } from "react"

import { authModel } from "@features/Authorization"
import { HomePage } from "@pages/HomePage"
import { useAppDispatch, useAppSelector } from "@shared/store"
import { userModel } from "@entities/User"
import { Status } from "@shared/api"

const App = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(userModel.selectors.isAuth)
  const refreshTokenLoadingStatus = useAppSelector(
    authModel.selectors.refreshTokenProcessStatus,
  )

  useEffect(() => {
    if (localStorage.getItem("accessTokenExpiration")) {
      dispatch(authModel.thunks.updateRefreshToken())
    }
  }, [])

  if (refreshTokenLoadingStatus === Status.loading) {
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
