import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  if (!localStorage.getItem("valid")) {
    return <Navigate to="/" />;
  }
  return children;
}

export default PrivateRoute;