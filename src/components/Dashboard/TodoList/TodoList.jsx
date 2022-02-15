import React, { useState } from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { TodoListItem } from './TodoListItem/TodoListItem'

const tableColums = ['Title', 'Completed', 'Delete']

const TodoList = ({ todos }) => {
  return (
    <>
      {todos?.length > 0 ? (
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
            {todos.map((todo, index) => (
              <TodoListItem {...todo} key={index} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="subtitle" align="center">
          No hay todos.
        </Typography>
      )}
    </>
  )
}

export default TodoList
