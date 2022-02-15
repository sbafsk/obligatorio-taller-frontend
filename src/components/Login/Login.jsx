import React, { useRef } from 'react'
import {
  Typography,
  Container,
  Button,
  TextField,
  Link,
  Box
} from '@mui/material'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(emailRef.current.value, passwordRef.current.value)
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
          Sign in
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
            Sign In
          </Button>
          <Link href="#" variant="body2">
            Registro
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
