import {
  ON_LOAD_ORDERS,
  ON_ADD_ORDER,
  ON_DELETE_ORDER,
  ON_COMPLETE_ORDER,
  ON_LOG_OUT,
  ON_USER_LOGGED
} from './constants'

const onUserLogged = (payload) => {
  return {
    type: ON_USER_LOGGED,
    payload: payload
  }
}

const onLoadOrders = (orders) => {
  return { type: ON_LOAD_ORDERS, payload: orders }
}

const onAddOrder = (order) => {
  return { type: ON_ADD_ORDER, payload: order }
}

const onDeleteOrder = (orderId) => {
  return {
    type: ON_DELETE_ORDER,
    payload: {
      id: orderId
    }
  }
}

const onCompleteOrder = (orderId) => {
  return {
    type: ON_COMPLETE_ORDER,
    payload: {
      id: orderId
    }
  }
}

const onLogout = () => {
  return {
    type: ON_LOG_OUT
  }
}

export {
  onUserLogged,
  onLoadOrders,
  onAddOrder,
  onDeleteOrder,
  onCompleteOrder,
  onLogout
}
