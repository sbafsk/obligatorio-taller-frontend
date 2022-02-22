import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import {
  Paper,
  Button,
  TextField,
  Box,
  FormLabel,
  InputAdornment
} from '@mui/material'

import { onAddOrder } from '../../../store/actions'
import { addOrder } from '../../../services/api'
import { calculateDistance, calculateOrderTotal } from '../../../utils'

const customStyles = {
  container: (provided) => ({
    ...provided,
    margin: '10px 0'
  })
}
const OrderForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ciudadOrigen: {},
      ciudadDestino: {},
      categoria: {},
      peso: ''
    }
  })
  const { cities, categories, userLogged } = useSelector((state) => state)
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const distance = calculateDistance(
      cities.find((c) => c.id === data.ciudadOrigen.value),
      cities.find((c) => c.id === data.ciudadDestino.value)
    )
    const price = calculateOrderTotal(distance, data.peso)

    const order = {
      idCiudadOrigen: data.ciudadOrigen.value,
      idCiudadDestino: data.ciudadDestino.value,
      idCategoria: data.categoria.value,
      peso: data.peso,
      distancia: distance,
      precio: price
    }
    // todo createOrder
    try {
      await addOrder(order, userLogged)
      dispatch(onAddOrder(data))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Paper maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormLabel>Ciudad Origen</FormLabel>
          <Controller
            name="ciudadOrigen"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={customStyles}
                options={
                  cities &&
                  cities.map((c) => ({ value: c.id, label: c.nombre }))
                }
              />
            )}
          />
          <FormLabel>Ciudad Destino</FormLabel>
          <Controller
            name="ciudadDestino"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={customStyles}
                options={
                  cities &&
                  cities.map((c) => ({ value: c.id, label: c.nombre }))
                }
              />
            )}
          />
          <FormLabel>Categoria</FormLabel>
          <Controller
            name="categoria"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                styles={customStyles}
                options={
                  categories &&
                  categories.map((c) => ({ value: c.id, label: c.nombre }))
                }
              />
            )}
          />
          <FormLabel>Peso del paquete</FormLabel>
          <Controller
            name="peso"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                size="small"
                id="peso"
                type="number"
                name="peso"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  )
                }}
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Crear
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default OrderForm
