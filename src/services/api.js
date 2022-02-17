const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Login
 * @param {object} userData
 * @returns Promise
 */
const onLogin = async (userData) => {
  try {
    return Promise.resolve({
      id: 1,
      username: 'TestingUser',
      token: 'fmpRuzZMhZa6fMECtH6Y5UmH4hz6DUxv'
    })
    // Esto es lo que hay que hacer para comunicarme con la API
    /*
    const response = await fetch(`${BASE_URL}/login`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.status === 200) {
      return response.json();
    } else {
      return {
        message: 'Ha ocurrido un error en la petición',
        status: response.status,
      };
    }
    */
  } catch (error) {
    return Promise.reject({
      message: error.message
    })
  }
}
/**
 * Get orders from the given user
 * @param {object} userData
 * @returns Promise
 */
const getOrders = async (userData) => {
  const response = await fetch(`${BASE_URL}/todos?userId=${userData.id}`, {
    headers: {
      'content-type': 'application/json',
      authorization: userData.token
    },
    method: 'GET'
  })

  if (response.status === 200) {
    return response.json()
  } else {
    return Promise.reject({
      message: 'Ha ocurrido un error en la petición',
      status: response.status
    })
  }
}
/**
 * Add a new order
 * @param {object} order
 * @param {object} userData
 * @returns Promise
 */
const addOrder = async (order, userData) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    headers: {
      'content-type': 'application/json',
      authorization: userData.token
    },
    body: JSON.stringify(order),
    method: 'POST'
  })

  if (response.status === 200 || response.status === 201) {
    return response.json()
  } else {
    return Promise.reject({
      message: 'Ha ocurrido un error en la petición',
      status: response.status
    })
  }
}

/**
 * Delete order
 * @param {number} orderId
 * @param {object} userData
 * @returns Promise
 */
const deleteOrder = async (orderId, userData) => {
  const response = await fetch(`${BASE_URL}/orders?id=${orderId}`, {
    headers: {
      'content-type': 'application/json',
      authorization: userData.token
    },
    method: 'DELETE'
  })

  if (response.status === 200) {
    return response.json()
  } else {
    return Promise.reject({
      message: 'Ha ocurrido un error en la petición',
      status: response.status
    })
  }
}

/**
 * Complete order
 * @param {number} orderId
 * @param {object} userData
 * @returns Promise
 */
const completeOrder = async (order, userData) => {
  const response = await fetch(`${BASE_URL}/orders?id=${order.id}`, {
    headers: {
      'content-type': 'application/json',
      authorization: userData.token
    },
    body: JSON.stringify(order),
    method: 'UPDATE'
  })

  if (response.status === 200) {
    return response.json()
  } else {
    return Promise.reject({
      message: 'Ha ocurrido un error en la petición',
      status: response.status
    })
  }
}

export { onLogin, deleteOrder, getOrders, addOrder, completeOrder }
