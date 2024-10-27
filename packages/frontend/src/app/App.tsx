import "./App.css"

import { ProtectedRoute, Routes } from "./routers"
import { useEffect } from "react"

import { authModel } from "@features/Authorization"
import { WelcomePage } from "@pages/WelcomePage"
import { useAppDispatch, useAppSelector } from "@shared/store"
import { userModel } from "@entities/User"
import { Status } from "@shared/api"
import { MainPage } from "@pages/MainPage"
import { Route } from "react-router-dom"
import { WordsPage } from "@pages/WordsPage/ui"

const App = () => {
  const dispatch = useAppDispatch()
  //const isAuth = useAppSelector(userModel.selectors.isAuth)
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

  return (
    <Routes>
      <Route path="/auth" element={<WelcomePage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/word-list"
        element={
          <ProtectedRoute>
            <WordsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
