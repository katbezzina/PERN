import React, {ReactNode} from 'react'
import { Navigate } from "react-router-dom";
import IsAuthenticated from '../Utils/isAuthenticated';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const userIsAuthenticated = IsAuthenticated()
  return (
    <>{userIsAuthenticated ? children : <Navigate to="/Login" replace />}</>
  )
}

export default ProtectedRoute;