const BASE_URL = 'https://envios.develotion.com/'
// api.js
export const getTodos = async (userData) => {
  const response = await fetch(`${BASE_URL}/todos?userId=${userData.id}`, {
    headers: {
      'content-type': 'application/json',
      authorization: userData.token
    }
  })

  return response.data
}
