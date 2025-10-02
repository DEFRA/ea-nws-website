import * as turf from '@turf/turf'

export const convertDataToGeoJsonFeature = (geoJsonType, geoJsonData) => {
  let shape

  switch (geoJsonType) {
    case 'Point':
      shape = turf.point(geoJsonData)
      shape = turf.buffer(shape, 0.001)
      break
    case 'MultiPoint':
      shape = turf.multiPoint(geoJsonData)
      break
    case 'LineString':
      shape = turf.lineString(geoJsonData)
      break
    case 'MultiLineString':
      shape = turf.multiLineString(geoJsonData)
      break
    case 'Polygon':
      shape = turf.polygon(geoJsonData)
      break
    case 'MultiPolygon':
      shape = turf.multiPolygon(geoJsonData)
      break
    default:
      shape = turf.point(geoJsonData)
      break
  }

  return shape
}

export const getAreaOrLength = (geoJsonType, geoJsonData) => {
  const shape = convertDataToGeoJsonFeature(geoJsonType, geoJsonData)
  let size

  switch (geoJsonType) {
    case 'LineString':
      size = turf.length(shape)
      break
    case 'MultiLineString':
      size = turf.length(shape)
      break
    case 'Polygon':
      size = turf.area(shape)
      break
    case 'MultiPolygon':
      size = turf.area(shape)
      break
  }

  return size
}

export const getCentre = (geoJsonType, geoJsonData) => {
  const shape = convertDataToGeoJsonFeature(geoJsonType, geoJsonData)
  const centre = turf.centroid(shape)

  return centre
}

export const getBoundaryBoxFromCollectionOfFeatures = (features) => {
  const bbox = turf.bbox(turf.featureCollection(features))

  return bbox
}
