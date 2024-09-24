import proj4 from 'proj4'

proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
)
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')

const areCoordinatesInEspg4326 = (x, y) => {
  return x >= -180 && x <= 180 && y >= -90 && y <= 90
}

const areCoordinatesInEspg27700 = (x, y) => {
  return x >= 100000 && x <= 800000 && y >= 0 && y <= 1300000
}

// Converts from EPSG:4326 (WGS 84) to EPSG:27700 (British National Grid)
export const convertCoordinatesToEspg27700 = (x, y) => {
  if (areCoordinatesInEspg27700(x, y)) {
    return { latitude: y, longitude: x }
  }
  const [longitude, latitude] = proj4('EPSG:4326', 'EPSG:27700', [x, y])
  return { latitude, longitude }
}

// Converts from EPSG:27700 (British National Grid) to EPSG:4326 (WGS 84)
export const convertCoordinatesToEspg4326 = (x, y) => {
  if (areCoordinatesInEspg4326(x, y)) {
    // Coordinates already in EPSG:4326, no conversion needed
    return { latitude: y, longitude: x }
  }
  const [longitude, latitude] = proj4('EPSG:27700', 'EPSG:4326', [x, y])

  return { latitude, longitude }
}
