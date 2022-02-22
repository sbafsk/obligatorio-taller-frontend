export const actionTypes = {
  ON_USER_LOGGED: 'ON_USER_LOGGED',
  ON_LOAD_ORDERS: 'ON_LOAD_ORDERS',
  ON_LOAD_CITIES: 'ON_LOAD_CITIES',
  ON_LOAD_DEPARTAMENTS: 'ON_LOAD_DEPARTAMENTS',
  ON_LOAD_CATEGORIES: 'ON_LOAD_CATEGORIES',
  ON_ADD_ORDER: 'ON_ADD_ORDER',
  ON_DELETE_ORDER: 'ON_DELETE_ORDER',
  ON_COMPLETE_ORDER: 'ON_COMPLETE_ORDER',
  ON_LOG_OUT: 'ON_LOG_OUT',
  SET_LOADING: 'SET_LOADING'
}

const localData = sessionStorage.getItem('current_user')
const userLogged = localData ? JSON.parse(localData) : null

export const initialState = {
  userLogged: userLogged,
  orders: [],
  departaments: [],
  cities: [],
  categories: [],
  loading: true
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.ON_USER_LOGGED:
      return { ...state, userLogged: payload, loading: false }
    case actionTypes.ON_LOAD_ORDERS:
      return { ...state, orders: payload, loading: false }
    case actionTypes.ON_LOAD_CITIES:
      return { ...state, cities: payload, loading: false }
    case actionTypes.ON_LOAD_DEPARTAMENTS:
      return { ...state, departaments: payload, loading: false }
    case actionTypes.ON_LOAD_CATEGORIES:
      return { ...state, categories: payload, loading: false }
    case actionTypes.ON_ADD_ORDER: {
      return { ...state, orders: [...state.orders, payload] }
    }
    case actionTypes.ON_DELETE_ORDER: {
      const newOrderList = state.orders.filter(
        (order) => order.id !== payload.id
      )
      return { ...state, orders: newOrderList }
    }
    case actionTypes.ON_COMPLETE_ORDER: {
      const newOrderList = state.orders.map((order) => {
        if (order.id === payload.id) return { ...order, completed: true }
        else return order
      })
      return { ...state, orders: newOrderList }
    }
    case actionTypes.ON_LOG_OUT:
      return { ...state, userLogged: null }
    case actionTypes.SET_LOADING:
      return { ...state, loading: payload }
    default:
      return state
  }
}

export default reducer
