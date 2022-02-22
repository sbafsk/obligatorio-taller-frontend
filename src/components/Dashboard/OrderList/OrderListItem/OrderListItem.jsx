import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableCell, TableRow, IconButton, Checkbox } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

import { onDeleteOrder, onCompleteOrder } from '../../../../store/actions'
import { deleteOrder, completeOrder } from '../../../../services/api'

const OrderListItem = ({
  id,
  ciudad_destino,
  ciudad_origen,
  categoria,
  distancia,
  precio,
  completed
}) => {
  const userLogged = useSelector((state) => state.userLogged)
  // todo getCityName
  const origen = useSelector((state) =>
    state.cities.find((c) => Number(c.id) === ciudad_origen)
  )
  const destino = useSelector((state) =>
    state.cities.find((c) => Number(c.id) === ciudad_destino)
  )

  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id, userLogged)
      dispatch(onDeleteOrder(id))
    } catch (error) {
      alert(error.message)
    }
  }

  const handleComplete = async (id) => {
    try {
      //await completeOrder(id, userLogged)
      dispatch(onCompleteOrder(id))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{origen?.nombre}</TableCell>
      <TableCell>{destino?.nombre}</TableCell>
      <TableCell>{distancia}</TableCell>
      <TableCell>$ {precio}</TableCell>
      <TableCell>
        <Checkbox
          checked={completed}
          onChange={() => handleComplete(id)}
          disabled={completed}
        />
      </TableCell>
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
