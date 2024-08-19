import type React from "react"
import { WelcomePage } from "@pages/WelcomePage"
import { ReactNode } from "react"
import { useAppSelector } from "@shared/store"
import { userModel } from "@entities/User"

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(userModel.selectors.isAuth)

  if (!isAuthenticated) {
    return <WelcomePage /> //<Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute

/* const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuth)
  //const location = useLocation()
  console.log("work ProtectedRoute")
  if (!isAuthenticated) {
    return <HomePage /> //<Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
 */
