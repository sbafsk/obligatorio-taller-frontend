import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useAuth } from '../../contexts/auth'

export default function PrivateRoute({ children, path }) {
  const { user } = useAuth()

  return <Route path={path}>{user ? children : <Redirect to="/login" />}</Route>
}
