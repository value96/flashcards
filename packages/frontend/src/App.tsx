import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import { Quotes } from "./features/quotes/Quotes"
import { WordComponent } from "./components/Word/Word"
import logo from "./logo.svg"
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

const fetchData = async (url: string) => {
  console.log(`API_URL: ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  console.log(`${response}`)
  const json = await response.json()
  return json
}

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
  else return <HomePage />
}

export default App

/* <Routes>
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<SignInForm />} />
      </Routes> */

/* <Routes>
        <Route
          path="/flashcard"
          element={
            <ProtectedRoute>
              <Flashcard />
            </ProtectedRoute>
          }
        />
      </Routes> */
