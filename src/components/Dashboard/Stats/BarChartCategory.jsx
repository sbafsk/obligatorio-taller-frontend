import React from 'react'
import { Box, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

const BarChartCategory = ({ orders, categories }) => {
  const data = orders.reduce((arr, order) => {
    const category = categories.find((c) => c.id == order.id_categoria)

    if (arr.length === 0)
      return [{ id: category.id, name: category.nombre, totalOrders: 1 }]

    const present = arr.find((e) => e.id === category.id)

    if (present) {
      arr = arr.map((e) =>
        e.id == category.id
          ? { ...present, totalOrders: present.totalOrders + 1 }
          : e
      )
    } else {
      arr.push({
        id: category.id,
        name: category.nombre,
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
        Envios por categoria
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

export default BarChartCategory
