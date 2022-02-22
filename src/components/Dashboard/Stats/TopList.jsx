import React from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'

const TopList = ({ orders, cities, departaments }) => {
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

  return (
    tableData?.length > 0 && (
      <Box sx={{ margin: 4 }}>
        <Typography variant="subtitle" sx={{ mx: 12 }}>
          Top 5 Departamentos
        </Typography>
        <Table size="small" sx={{ mb: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
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
                  <TableCell align="right">{totalOrders}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    )
  )
}

export default TopList
