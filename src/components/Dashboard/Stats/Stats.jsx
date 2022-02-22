import React from 'react'
import { useSelector } from 'react-redux'
import { Paper } from '@mui/material'

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
        flexDirection: 'column',
        px: 24
      }}
    >
      <TopList orders={orders} cities={cities} departaments={departaments} />
      <BarChartCity orders={orders} cities={cities} />
      <BarChartCategory orders={orders} categories={categories} />
    </Paper>
  )
}

export default Stats
