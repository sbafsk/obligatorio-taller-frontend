import getDistance from 'geolib/es/getDistance'

export const calculateDistance = (origen, destino) => {
  return (
    getDistance(
      { latitude: origen.latitud, longitude: origen.longitud },
      { latitude: destino.latitud, longitude: destino.longitud }
    ) / 1000
  )
}

export const calculateOrderTotal = (distancia, peso) => {
  //Precio base ($50) + $10 por kilo + $50 por cada 100km.
  return 50 + 10 * peso + distancia / 2
}
