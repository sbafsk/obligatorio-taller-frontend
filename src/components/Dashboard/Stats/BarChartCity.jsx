import React from 'react'
import { Box, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

const BarChartCity = ({ orders, cities }) => {
  const data = orders.reduce((arr, order) => {
    const city = cities.find((c) => c.id == order.ciudad_origen)

    if (arr.length === 0)
      arr = [{ id: city.id, name: city.nombre, totalOrders: 1 }]

    const present = arr.find((e) => e.id === city.id)

    if (present) {
      arr = arr.map((e) =>
        e.id == city.id
          ? { ...present, totalOrders: present.totalOrders + 1 }
          : e
      )
    } else {
      arr.push({
        id: city.id,
        name: city.nombre,
        totalOrders: 1
      })
    }

    return arr
  }, [])

  const config = {
    options: {
      chart: {
        id: 'basic-bar',
        type: 'bar'
      },
      xaxis: {
        categories: data.map((v) => v.name)
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      }
    },
    series: [
      {
        data: data.map((v) => v.totalOrders),
        name: 'Envios'
      }
    ]
  }
  return (
    <Box sx={{ margin: 4 }}>
      <Typography variant="subtitle" sx={{ mx: 12 }}>
        Envios por ciudad de origen
      </Typography>
      <Chart
        options={config.options}
        series={config.series}
        type="bar"
        width="500"
      />
    </Box>
  )
}

export default BarChartCity
