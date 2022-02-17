import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ children, path }) => {
  const userLogged = useSelector((state) => state.userLogged)

  return (
    <Route path={path}>
      {userLogged ? children : <Redirect to="/login" />}
    </Route>
  )
}

export default PrivateRoute
