import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'

import TodoList from './TodoList'
import TodoForm from './TodoForm'
import Navbar from '../Navbar'
import Header from '../Header/Header'
import { getTodos } from '../../services/api'

const Dashboard = ({ userLogged }) => {
  const [todos, setTodos] = useState([])

  useEffect(
    () =>
      (async () => {
        try {
          const newTodos = await getTodos(userLogged.id)
          setTodos(newTodos)
        } catch (error) {
          console.log(error.message)
        }
      })(),
    []
  )

  return (
    <Container>
      <Header />
      <Typography variant="h1">Dashboard</Typography>
      <Navbar />
      <TodoForm />
      <TodoList todos={todos} />
    </Container>
  )
}

export default Dashboard
