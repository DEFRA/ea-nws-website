import * as turf from '@turf/turf'

export const convertDataToGeoJsonFeature = (geoJsonType, geoJsonData) => {
  let shape

  switch (geoJsonType) {
    case 'Point':
      shape = turf.point(geoJsonData)
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

export const doFeaturesIntersect = (feature1, feature2) => {
  let line1, line2

  if (feature1.geometry.type === 'LineString') {
    line1 = feature1
  } else if (feature1.geometry.type === 'MultiLineString') {
    line1 = turf.flatten(feature1).features
  } else if (
    feature1.geometry.type === 'Polygon' ||
    feature1.geometry.type === 'MultiPolygon'
  ) {
    line1 = turf.polygonToLine(feature1)
  }

  if (
    feature2.geometry.type === 'Polygon' ||
    feature2.geometry.type === 'MultiPolygon'
  ) {
    line2 = turf.polygonToLine(feature2)
  }

  console.log('line1', line1)
  console.log('line2', line2)

  let line1Array = Array.isArray(line1) ? line1 : [line1]
  let line2Array = Array.isArray(line2) ? line2.features : [line2]

  console.log('Transformed line1 coordinates:', line1Array)
  console.log('Transformed line2 coordinates:', line2Array)

  for (let l1 of line1Array) {
    for (let l2 of line2Array) {
      let intersections = turf.lineIntersect(l1, l2)
      console.log('Intersections:', intersections)
      if (intersections.features.length > 0) {
        return intersections.features[0]
      }
    }
  }

  return null
}
