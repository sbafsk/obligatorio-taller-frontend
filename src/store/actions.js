import { actionTypes } from './reducer'

const onUserLogged = (payload) => {
  return {
    type: actionTypes.ON_USER_LOGGED,
    payload: payload
  }
}

const onLoadOrders = (data) => {
  return { type: actionTypes.ON_LOAD_ORDERS, payload: data.envios }
}

const onLoadCities = (data) => {
  return { type: actionTypes.ON_LOAD_CITIES, payload: data.ciudades }
}

const onLoadDepartaments = (data) => {
  return { type: actionTypes.ON_LOAD_DEPARTAMENTS, payload: data.departamentos }
}

const onLoadCategories = (data) => {
  return { type: actionTypes.ON_LOAD_CATEGORIES, payload: data.categorias }
}

const onAddOrder = (order) => {
  return { type: actionTypes.ON_ADD_ORDER, payload: order }
}

const onDeleteOrder = (orderId) => {
  return {
    type: actionTypes.ON_DELETE_ORDER,
    payload: {
      id: orderId
    }
  }
}

const onCompleteOrder = (orderId) => {
  return {
    type: actionTypes.ON_COMPLETE_ORDER,
    payload: {
      id: orderId
    }
  }
}

const onLoading = (value) => {
  return {
    type: actionTypes.SET_LOADING,
    payload: value
  }
}

const onLogout = () => {
  return {
    type: actionTypes.ON_LOG_OUT
  }
}

export {
  onUserLogged,
  onLoadOrders,
  onLoadCities,
  onLoadDepartaments,
  onLoadCategories,
  onAddOrder,
  onDeleteOrder,
  onCompleteOrder,
  onLogout,
  onLoading
}
