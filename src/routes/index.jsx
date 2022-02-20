import React, { useEffect } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Dashboard from '../components/Dashboard'
import { Login, Register } from '../components/Login'
import PrivateRoute from './PrivateRoute'
import Error from './Error'

export const paths = {
  dashboard: '/dashboard',
  login: '/login',
  register: '/register',
  root: '/',
  all: '*'
}

const Routes = () => {
  const userLogged = useSelector((state) => state.userLogged)
  const history = useHistory()

  const { pathname } = useLocation()

  useEffect(() => {
    if (userLogged !== null) {
      const location =
        pathname !== paths.login && pathname !== paths.root
          ? pathname
          : paths.dashboard
      console.log(location)
      history.push(location)
    }
  }, [userLogged])

  return (
    <Switch>
      <Route exact path={paths.root} component={Login} />
      <Route exact path={paths.login} component={Login} />
      {/* <Route exact path={paths.register} component={Register} /> */}
      <PrivateRoute path={paths.dashboard}>
        <Dashboard />
      </PrivateRoute>
      <Route path={paths.all} component={Error} />
    </Switch>
  )
}

export default Routes
