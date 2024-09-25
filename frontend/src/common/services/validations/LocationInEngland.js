import * as turf from '@turf/turf'
import { backendCall } from '../BackendService'

export const locationInEngland = async (lat, lng) => {
  // warning areas
  const WFSParams = {
    service: 'WFS',
    map: 'uk-ob.qgz',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'aoi-national-boundary',
    srsname: 'EPSG:4326',
    outputFormat: 'GEOJSON'
  }

  const { data: geojson } = await backendCall(
    WFSParams,
    'api/wfs'
  )
  console.log(geojson)
  console.log(geojson.features[0].geometry.coordinates)
  const point = turf.point([lng, lat])
  const poly = turf.multiPolygon(geojson.features[0].geometry.coordinates)
  const isInEngland = turf.booleanPointInPolygon(point, poly)
  return isInEngland
}
