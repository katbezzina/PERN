import React from 'react'
import { Navigate } from "react-router-dom";
import IsAuthenticated from '../Utils/isAuthenticated';

const ProtectedRoute = ({ children }) => {
    const userIsAuthenticated = IsAuthenticated()
  return (
    <>{userIsAuthenticated ? children : <Navigate to="/Login" replace />}</>
  )
}

export default ProtectedRoute;