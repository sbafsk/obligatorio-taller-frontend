import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

import { onDeleteOrder } from '../../../store/actions'
import { deleteOrder } from '../../../services/api'
import OrderListItem from './OrderListItem'

const tableColums = ['Origen', 'Destino', 'Distancia (km)', 'Precio', 'Borrar']

const OrderList = ({ orders, setSnackData }) => {
  const user = useSelector((state) => state.userLogged)
  const dispatch = useDispatch()
  const handleDelete = async (id) => {
    try {
      await deleteOrder(id, user)
      dispatch(onDeleteOrder(id))
      setSnackData({ open: true, message: 'Envio borrado', variant: 'info' })
    } catch (error) {
      setSnackData({
        open: true,
        message: 'Error al intentar borrar',
        variant: 'error'
      })
    }
  }
  return (
    <Paper sx={{ display: 'flex', justifyContent: 'center' }}>
      {orders?.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              {tableColums.map((val, i) => (
                <TableCell sx={{ fontWeight: 'bold' }} key={i}>
                  {val}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderListItem
                orderData={order}
                handleDelete={handleDelete}
                key={order.id}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="subtitle" sx={{ padding: '100px' }}>
          No tiene envios registrados.
        </Typography>
      )}
    </Paper>
  )
}

export default OrderList
