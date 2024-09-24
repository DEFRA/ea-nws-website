import proj4 from 'proj4'

proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
)
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')

// Converts from EPSG:4326 (WGS 84) to EPSG:27700 (British National Grid)
export const convertCoordinatesToEspg27700 = (longitude, latitude) => {
  const [northing, easting] = proj4('EPSG:4326', 'EPSG:27700', [
    longitude,
    latitude
  ])
  return { northing, easting }
}

// Converts from EPSG:27700 (British National Grid) to EPSG:4326 (WGS 84)
export const convertCoordinatesToEspg4326 = (easting, northing) => {
  const [longitude, latitude] = proj4('EPSG:27700', 'EPSG:4326', [
    easting,
    northing
  ])

  return { latitude, longitude }
}
