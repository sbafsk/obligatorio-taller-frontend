import React, { useState } from 'react'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { Login } from '../Login'
import Dashboard from '../Dashboard'

const theme = createTheme()

const App = () => {
  const [userLogged, setUserLogged] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {userLogged ? <Dashboard userLogged={userLogged} /> : <Login />}
    </ThemeProvider>
  )
}

export default App
