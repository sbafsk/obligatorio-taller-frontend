import React from 'react'
import { AppBar, Avatar, Toolbar } from '@mui/material'

import LogoutButton from './LogoutButton'
import NavBar from './NavBar'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Avatar alt="Profile Picture" src={'http://is.am/5z3c'} />
        <NavBar />
        <LogoutButton />
      </Toolbar>
    </AppBar>
  )
}

export default Header
