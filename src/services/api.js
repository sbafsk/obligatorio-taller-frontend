import axios from 'axios'

const api = axios.create({
  baseURL: 'https://envios.develotion.com',
  withCredentials: false
})

const onSignup = async (data) => {
  try {
    const response = await api({
      url: 'usuarios.php',
      method: 'post',
      data: { usuario: data.email, password: data.password }
    })
    if (response.status === 200) {
      return response.data
    } else if (response.status === 409) {
      throw new Error(response.mensaje)
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

const onLogin = async (data) => {
  try {
    const response = await api({
      url: 'login.php',
      method: 'post',
      data: { usuario: data.email, password: data.password }
    })

    if (response.status === 200) {
      return response.data
    } else {
      return {
        message: 'Ha ocurrido un error en la petición',
        status: response.status
      }
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

const getCities = async (userData, id = null) => {
  try {
    const response = await api({
      url: `ciudades.php ${id ? `idDepartamento=${id}` : ''}`,
      method: 'get',
      headers: {
        apikey: userData.apiKey
      }
    })
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject({
        message: 'Ha ocurrido un error en la petición',
        status: response.status
      })
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

const getDepartaments = async (userData) => {
  try {
    const response = await api({
      url: 'departamentos.php',
      method: 'get',
      headers: {
        apikey: userData.apiKey
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject({
        message: 'Ha ocurrido un error en la petición',
        status: response.status
      })
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

const getCategories = async (userData) => {
  try {
    const response = await api({
      url: 'categorias.php',
      method: 'get',
      headers: {
        apikey: userData.apiKey
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject({
        message: 'Ha ocurrido un error en la petición',
        status: response.status
      })
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

const getOrders = async (userData) => {
  try {
    const response = await api({
      url: `envios.php?idUsuario=${userData.id}`,
      method: 'get',
      headers: {
        apikey: userData.apiKey
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject({
        message: 'Ha ocurrido un error en la petición',
        status: response.status
      })
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

const addOrder = async (order, userData) => {
  try {
    const response = await api({
      url: 'envios.php',
      method: 'post',
      headers: {
        apikey: userData.apiKey
      },
      data: {
        ...order,
        idUsuario: userData.id
      }
    })

    if (response.status === 200 || response.status === 201) {
      return response.data.idEnvio
    } else {
      return Promise.reject({
        message: 'Ha ocurrido un error en la petición',
        status: response.status
      })
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

const deleteOrder = async (orderId, userData) => {
  try {
    const response = await api({
      url: 'envios.php',
      method: 'delete',
      headers: {
        apikey: userData.apiKey
      },
      data: {
        idEnvio: orderId
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject({
        message: 'Ha ocurrido un error en la petición',
        status: response.status
      })
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

export {
  onSignup,
  onLogin,
  getCities,
  getDepartaments,
  getCategories,
  getOrders,
  deleteOrder,
  addOrder
}
