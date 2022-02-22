import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'

const tableColums = ['Nombre', 'Total de envios']

//Top 5 de los departamentos con más envíos: se deberá crear una tabla con la lista de los 5
//departamentos con más envíos realizados por el usuario. En la lista se deberá indicar, nombre del departamento y el total de envíos al mismo.

const TopList = () => {
  const { orders, cities, departaments } = useSelector((state) => state)

  const tableData = orders.reduce((arr, order) => {
    const city = cities.find((c) => c.id == order.ciudad_destino)
    const dep = departaments.find((dep) => dep.id == city.id_departamento)

    if (arr.length === 0)
      arr = [{ id: dep.id, name: dep.nombre, totalOrders: 1 }]

    const present = arr.find((e) => e.id === dep.id)

    if (present) {
      arr = arr.map((e) =>
        e.id == dep.id
          ? { ...present, totalOrders: present.totalOrders + 1 }
          : e
      )
    } else {
      arr.push({
        id: dep.id,
        name: dep.nombre,
        totalOrders: 1
      })
    }

    return arr
  }, [])

  return tableData?.length > 0 ? (
    <Box sx={{ p: 4 }}>
      <Typography variant="subtitle" sx={{ mx: 12 }}>
        Top 5 Departamentos
      </Typography>
      <Table size="small" sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>
              Total de envios recibidos
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .sort((a, b) => b.totalOrders - a.totalOrders)
            .slice(0, 4)
            .map(({ id, name, totalOrders }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell align="center">{totalOrders}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  ) : (
    <Typography variant="subtitle" sx={{ mx: 12 }}>
      No tiene envios registrados.
    </Typography>
  )
}

export default TopList
