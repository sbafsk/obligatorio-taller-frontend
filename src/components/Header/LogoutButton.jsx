import React from 'react'
import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import { Logout } from '@mui/icons-material'

import { onLogout } from '../../store/actions'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const onHandleLogout = () => {
    sessionStorage.removeItem('current_user')
    dispatch(onLogout())
  }
  return (
    <IconButton onClick={onHandleLogout}>
      <Logout />
    </IconButton>
  )
}

export default LogoutButton
