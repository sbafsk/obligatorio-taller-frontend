import React from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import OrderListItem from './OrderListItem'

const tableColums = ['Id', 'Title', 'Completed', 'Delete']

const OrderList = ({ orders }) => {
  return (
    <>
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
            {orders.map((order, index) => (
              <OrderListItem {...order} key={index} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="subtitle" align="center">
          No hay pedidos.
        </Typography>
      )}
    </>
  )
}

export default OrderList
