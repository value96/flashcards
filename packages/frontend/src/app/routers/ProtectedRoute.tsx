import { ReactNode } from "react"
import { useAppSelector } from "@shared/store"
import { userModel } from "@entities/User"
import { Navigate } from "react-router-dom"

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(userModel.selectors.isAuth)
  /* console.log(`isAuthenticated: ${isAuthenticated}`) */
  if (!isAuthenticated) {
    //return <WelcomePage /> //<Navigate to="/login" />
    return <Navigate to="/auth" replace={true} />
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
