import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  Typography,
  Container,
  Button,
  TextField,
  Link,
  Box
} from '@mui/material'

import { onUserLogged } from '../../store/actions'
import { onLogin } from '../../services/api'
import { paths } from '../../routes'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = emailRef.current.value
    const password = passwordRef.current.value

    if (username === '' || password === '') {
      alert('Por favor ingresa los campos obligatorios')
    } else {
      try {
        const data = await onLogin({ user: username, pass: password })
        sessionStorage.setItem('myOrderAppUser', JSON.stringify(data))
        dispatch(onUserLogged(data))
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Inicia Sesion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            inputRef={emailRef}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            inputRef={passwordRef}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Entrar
          </Button>
          No tienes cuenta ? <Link href={paths.register}>Registro</Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
