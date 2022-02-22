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
import { onSignup } from '../../services/api'
import { paths } from '../../routes'

const Signup = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const { apiKey, id } = await onSignup(data)
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
          Registro de usuario
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
                  required: true,
                  pattern:
                    '^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$'
                })}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Registrar
          </Button>
          <Link href={paths.login}>Volver al Login</Link>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup
