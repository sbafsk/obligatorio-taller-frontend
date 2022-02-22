import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
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
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const { apiKey, id } = await onLogin(data)
      sessionStorage.setItem('current_user', JSON.stringify({ apiKey, id }))
      dispatch(onUserLogged({ apiKey, id }))
    } catch (error) {
      alert(error.message)
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
          Iniciar Sesion
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('email', {
                  required: 'Email requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ingrese un email valido'
                  }
                })}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                helperText={
                  errors.email && (
                    <span style={{ color: '#d32f2f' }}>
                      {errors.email.message}
                    </span>
                  )
                }
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...register('password', {
                  required: true,
                  minLength: 6
                })}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={
                  errors.password && (
                    <span style={{ color: '#d32f2f' }}>
                      Password requerido.
                    </span>
                  )
                }
              />
            )}
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
