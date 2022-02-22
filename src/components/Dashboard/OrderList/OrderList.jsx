import React from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import OrderListItem from './OrderListItem'

const tableColums = [
  'Id',
  'Origen',
  'Destino',
  'Distancia (km)',
  'Precio',
  'Completado',
  'Borrar'
]

const OrderList = ({ orders }) => {
  return (
    <Paper>
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
              <OrderListItem {...order} key={order.id} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="subtitle" align="center">
          No hay pedidos.
        </Typography>
      )}
    </Paper>
  )
}

export default OrderList
