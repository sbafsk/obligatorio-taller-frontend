import React from 'react'
import { Box, Button } from '@mui/material'

import { Link } from 'react-router-dom'

const pages = [
  {
    name: 'Listar Pedidos',
    link: '/dashboard/list'
  },
  {
    name: 'Crear Pedido',
    link: '/dashboard/create'
  },
  {
    name: 'Stats',
    link: '/dashboard/stats'
  }
]

const NavBar = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {pages.map((page) => (
        <Button
          key={page.name}
          to={page.link}
          component={Link}
          size="large"
          sx={{ color: '#000' }}
          variant="outlined"
        >
          {page.name}
        </Button>
      ))}
    </Box>
  )
}

export default NavBar
