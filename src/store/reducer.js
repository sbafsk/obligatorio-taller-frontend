import {
  ON_LOAD_ORDERS,
  ON_ADD_ORDER,
  ON_DELETE_ORDER,
  ON_COMPLETE_ORDER,
  ON_LOG_OUT,
  ON_USER_LOGGED
} from './constants'

const localData = sessionStorage.getItem('myOrderAppUser')
const userLogged = localData ? JSON.parse(localData) : null

const initialState = {
  userLogged: userLogged,
  orders: []
}

const appReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ON_USER_LOGGED:
      return { ...state, userLogged: payload }
    case ON_LOAD_ORDERS:
      return { ...state, orders: payload }
    case ON_ADD_ORDER: {
      return { ...state, orders: [...state.orders, payload] }
    }
    case ON_DELETE_ORDER: {
      const newOrderList = state.orders.filter(
        (order) => order.id !== payload.id
      )
      return { ...state, orders: newOrderList }
    }
    case ON_COMPLETE_ORDER: {
      const newOrderList = state.orders.map((order) => {
        if (order.id === payload.id) return { ...order, completed: true }
        else return order
      })
      return { ...state, orders: newOrderList }
    }
    case ON_LOG_OUT:
      return { ...state, userLogged: null }
    default:
      return state
  }
}

export default appReducer
