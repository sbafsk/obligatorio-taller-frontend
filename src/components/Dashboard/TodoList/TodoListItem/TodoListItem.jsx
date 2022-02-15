import React from 'react'
import { TableCell, TableRow, IconButton } from '@mui/material'

import { Delete as DeleteIcon } from '@mui/icons-material'

export const TodoListItem = ({ id, title, completed }) => {
  const onDelete = () => {
    console.log(`delete project ${id}`)
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{completed}</TableCell>
      <IconButton onClick={() => onDelete(id)} size="small" sx={{ mr: 1 }}>
        <DeleteIcon sx={{ color: 'red' }} />
      </IconButton>
    </TableRow>
  )
}
