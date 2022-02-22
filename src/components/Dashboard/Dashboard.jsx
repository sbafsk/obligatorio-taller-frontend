import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Container
} from '@mui/material'

import {
  onLoadOrders,
  onLoadCities,
  onLoadCategories,
  onLoading,
  onLoadDepartaments
} from '../../store/actions'
import {
  getOrders,
  getCities,
  getCategories,
  getDepartaments
} from '../../services/api'
import Header from '../Header/Header'
import OrderList from './OrderList'
import OrderForm from './OrderForm'

import Stats from './Stats'

const Dashboard = () => {
  const initialState = { message: '', open: false }
  const [snackData, setSnackData] = useState(initialState)

  const { userLogged, orders, loading } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { path } = useRouteMatch()

  useEffect(
    () =>
      (async () => {
        try {
          const ordersResponse = await getOrders(userLogged)
          const citiesResponse = await getCities(userLogged)
          const departamentsResponse = await getDepartaments(userLogged)
          const categoryResponse = await getCategories(userLogged)
          dispatch(onLoadOrders(ordersResponse))
          dispatch(onLoadCities(citiesResponse))
          dispatch(onLoadDepartaments(departamentsResponse))
          dispatch(onLoadCategories(categoryResponse))
        } catch (error) {
          setSnackData({
            open: true,
            message: error.message,
            variant: 'error'
          })
        }
        dispatch(onLoading(false))
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
              <OrderForm setSnackData={setSnackData} />
            </Route>
            <Route exact path={`${path}/list`}>
              <OrderList orders={orders} setSnackData={setSnackData} />
            </Route>
            <Route exact path={`${path}/stats`}>
              <Stats />
            </Route>
          </Switch>
        </Container>
      )}
      <Snackbar
        open={snackData.open}
        autoHideDuration={3000}
        onClose={() => setSnackData(initialState)}
      >
        <Alert
          onClose={() => setSnackData(initialState)}
          severity={snackData.variant}
          sx={{ width: '100%' }}
        >
          {snackData.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Dashboard
