import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Container, Typography } from '@mui/material'

import { onLoadOrders } from '../../store/actions'
import { getOrders } from '../../services/api'
import Header from '../Header/Header'
import OrderList from './OrderList'
import OrderForm from './OrderForm'

import Stats from './Stats'

const Dashboard = () => {
  const userLogged = useSelector((state) => state.userLogged)
  const orders = useSelector((state) => state.orders)

  const dispatch = useDispatch()
  const { path } = useRouteMatch()

  useEffect(
    () =>
      (async () => {
        try {
          const ordersResponse = await getOrders(userLogged)
          dispatch(onLoadOrders(ordersResponse))
        } catch (error) {
          console.log(error.message)
        }
      })(),
    []
  )

  return (
    <Container>
      <Header />
      ## Dashboard ##
      <Switch>
        <Route exact path={`${path}/list`}>
          <Typography variant="h2">List</Typography>
          <OrderForm />
          <OrderList orders={orders} />
        </Route>
        <Route exact path={`${path}/stats`}>
          <Typography variant="h2">Stats</Typography>
          <Stats />
        </Route>
      </Switch>
    </Container>
  )
}

export default Dashboard
