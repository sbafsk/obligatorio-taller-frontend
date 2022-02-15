import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Error from '../pages/Error'
import Dashboard from '../components/Dashboard'
import { Login, Register } from '../components/Login'
import PrivateRoute from './PrivateRoute'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/register'} component={Register} />
        <PrivateRoute exact path={'/dashboard'} component={Dashboard} />
        <Route path={'*'} component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
