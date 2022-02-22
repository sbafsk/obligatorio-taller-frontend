import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  InputAdornment,
  Paper,
  TextField
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
const OrderForm = ({ setSnackData }) => {
  const { cities, categories, userLogged } = useSelector((state) => state)
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      ciudadOrigen: '',
      ciudadDestino: '',
      categoria: '',
      peso: ''
    }
  })

  const onSubmit = async (data) => {
    try {
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
      const orderId = await addOrder(order, userLogged)
      dispatch(onAddOrder({ id: orderId, ...order }))
      setSnackData({ open: true, message: 'Envio creado', variant: 'success' })
      reset()
    } catch (error) {
      setSnackData({
        open: true,
        message: 'Error al intentar crear',
        variant: 'error'
      })
    }
  }

  return (
    <Paper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <FormLabel>Ciudad Origen</FormLabel>
          <Controller
            name="ciudadOrigen"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                {...register('ciudadOrigen', {
                  required: 'Seleccione una ciudad de origen'
                })}
                onChange={onChange}
                value={value}
                styles={customStyles}
                options={
                  cities &&
                  cities.map((c) => ({ value: c.id, label: c.nombre }))
                }
              />
            )}
          />
          {errors?.ciudadOrigen && (
            <FormHelperText error sx={{ ml: '14px' }}>
              {errors.ciudadOrigen.message}
            </FormHelperText>
          )}
          <FormLabel>Ciudad Destino</FormLabel>
          <Controller
            name="ciudadDestino"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                {...register('ciudadDestino', {
                  required: 'Seleccione una ciudad de destino'
                })}
                onChange={onChange}
                value={value}
                styles={customStyles}
                options={
                  cities &&
                  cities.map((c) => ({ value: c.id, label: c.nombre }))
                }
              />
            )}
          />
          {errors?.ciudadDestino && (
            <FormHelperText error sx={{ ml: '14px' }}>
              {errors.ciudadDestino.message}
            </FormHelperText>
          )}
          <FormLabel>Categoria</FormLabel>
          <Controller
            name="categoria"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                {...register('categoria', {
                  required: 'Seleccione una categoria'
                })}
                onChange={onChange}
                value={value}
                styles={customStyles}
                options={
                  categories &&
                  categories.map((c) => ({ value: c.id, label: c.nombre }))
                }
              />
            )}
          />
          {errors?.categoria && (
            <FormHelperText error sx={{ ml: '14px' }}>
              {errors.categoria.message}
            </FormHelperText>
          )}
          <FormLabel>Peso del paquete</FormLabel>
          <Controller
            name="peso"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                size="small"
                id="peso"
                type="number"
                name="peso"
                helperText={
                  errors?.peso && (
                    <Box sx={{ color: '#d32f2f' }}>Ingrese el peso en kg</Box>
                  )
                }
                {...register('peso', {
                  required: true,
                  valueAsNumber: true
                })}
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
