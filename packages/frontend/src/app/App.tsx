import './App.css'
import { ProtectedRoute, AppRouter } from './routers'
import { useEffect } from 'react'
import { WelcomePage } from '@pages/WelcomePage'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { Status } from '@shared/api'
import { MainPage } from '@pages/MainPage'
import { Route } from 'react-router-dom'
import { WordsSettingsPage } from '@pages/WordsSettingsPage'
import { selectors, thunks } from './store'

export const App = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectors.selectAppStatus)

  useEffect(() => {
    dispatch(thunks.initializeApp())
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
    <AppRouter>
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
    </AppRouter>
  )
}
