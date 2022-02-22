import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Box, CircularProgress, Container } from '@mui/material'

import {
  onLoadOrders,
  onLoadCities,
  onLoadCategories,
  onLoadComplete
} from '../../store/actions'
import { getOrders, getCities, getCategories } from '../../services/api'
import Header from '../Header/Header'
import OrderList from './OrderList'
import OrderForm from './OrderForm'

import Stats from './Stats'

const Dashboard = () => {
  const { userLogged, orders, loading } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { path } = useRouteMatch()

  useEffect(
    () =>
      (async () => {
        try {
          const ordersResponse = await getOrders(userLogged)
          const citiesResponse = await getCities(userLogged)
          const categoryResponse = await getCategories(userLogged)
          dispatch(onLoadOrders(ordersResponse))
          dispatch(onLoadCities(citiesResponse))
          dispatch(onLoadCategories(categoryResponse))
          dispatch(onLoadComplete())
        } catch (error) {
          alert(error.message)
        }
      })(),
    []
  )

  return (
    <Box>
      <Header />
      {loading ? (
        <CircularProgress
          size={75}
          sx={{ m: '100px auto', display: 'block' }}
        />
      ) : (
        <Container
          sx={{ height: '100vh', width: 'auto', bgcolor: '#fafafa', pt: 4 }}
        >
          <Switch>
            <Route exact path={`${path}/create`}>
              <OrderForm />
            </Route>
            <Route exact path={`${path}/list`}>
              <OrderList orders={orders} />
            </Route>
            <Route exact path={`${path}/stats`}>
              <Stats />
            </Route>
          </Switch>
        </Container>
      )}
    </Box>
  )
}

export default Dashboard
