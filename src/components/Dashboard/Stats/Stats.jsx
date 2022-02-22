import React from 'react'
import { useSelector } from 'react-redux'
import { Paper, Typography } from '@mui/material'

import TopList from './TopList'
import BarChartCity from './BarChartCity'
import BarChartCategory from './BarChartCategory'

const Stats = () => {
  const { orders, cities, departaments, categories } = useSelector(
    (state) => state
  )
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {orders.length > 0 ? (
        <>
          <TopList
            orders={orders}
            cities={cities}
            departaments={departaments}
          />
          <BarChartCity orders={orders} cities={cities} />
          <BarChartCategory orders={orders} categories={categories} />
        </>
      ) : (
        <Typography variant="subtitle" sx={{ p: 12, m: '0 auto' }}>
          No tiene envios registrados como para generar stats.
        </Typography>
      )}
    </Paper>
  )
}

export default Stats
