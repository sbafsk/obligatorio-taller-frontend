import React from 'react'
import { useSelector } from 'react-redux'
import { TableCell, TableRow, IconButton } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

const OrderListItem = ({ orderData, handleDelete }) => {
  const { id, ciudad_destino, ciudad_origen, distancia, precio } = orderData

  const origen = useSelector((state) =>
    state.cities.find((c) => c.id === ciudad_origen)
  )
  const destino = useSelector((state) =>
    state.cities.find((c) => c.id === ciudad_destino)
  )

  return (
    <TableRow key={id}>
      <TableCell>{origen.nombre}</TableCell>
      <TableCell>{destino.nombre}</TableCell>
      <TableCell>{distancia}</TableCell>
      <TableCell>${precio.toFixed(2)}</TableCell>
      <TableCell>
        <IconButton
          onClick={() => handleDelete(id)}
          size="small"
          sx={{ mr: 1 }}
        >
          <DeleteIcon sx={{ color: 'red' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default OrderListItem
