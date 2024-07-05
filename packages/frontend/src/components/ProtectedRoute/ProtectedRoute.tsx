import type React from "react"
import type { RouteProps} from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectIsAuth } from "../../features/auth/authSlice"
import HomePage from "../../pages/HomePage/HomePage"

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuth)
  //const location = useLocation()
  console.log("work ProtectedRoute")
  if (!isAuthenticated) {
    return <HomePage /> //<Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
