import "./App.css"

import { ProtectedRoute } from "./routers"
import { useEffect } from "react"

import { authModel } from "@features/Authorization"
import { WelcomePage } from "@pages/WelcomePage"
import { useAppDispatch, useAppSelector } from "@shared/store"
import { userModel } from "@entities/User"
import { Status } from "@shared/api"
import { MainPage } from "@pages/MainPage"

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
        <MainPage />
        {/* <Flashcard /> */}
      </ProtectedRoute>
    )

  return <WelcomePage />
}

export default App
