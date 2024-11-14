import './App.css'

import { ProtectedRoute, Routes } from './routers'
import { useEffect } from 'react'
import { WelcomePage } from '@pages/WelcomePage'
import { useAppDispatch, useAppSelector } from '@shared/store'

import { Status } from '@shared/api'
import { MainPage } from '@pages/MainPage'
import { Route } from 'react-router-dom'
import { WordsSettingsPage } from '@pages/WordsSettingsPage'
import { selectors, thunks } from './store'

const { selectAppStatus } = selectors
const { initializeApp } = thunks

export const App = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectAppStatus)

  useEffect(() => {
    dispatch(initializeApp())
  }, [])
  console.log(`status: ${status}`)
  if (status === Status.idle) return ''

  if (status === Status.loading) {
    return 'Loading...'
  }

  if (status === Status.failed) {
    return 'error'
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
            <WordsSettingsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
