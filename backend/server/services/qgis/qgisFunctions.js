import { getWfsData } from '../WfsData'

const turf = require('@turf/turf')

const wfsCall = async (bbox, map, type) => {
    const WFSParams = {
      service: 'WFS',
      map,
      version: '1.1.0',
      request: 'GetFeature',
      typename: type,
      srsname: 'EPSG:4326',
      bbox,
      outputFormat: 'GEOJSON'
    }
    const result = await getWfsData(WFSParams, 'api/wfs')
    return result
  }

export const findTAs = async (lng, lat) => {
    const center = turf.point([lng, lat], { crs: 'EPSG:4326' })
    const buffered = turf.buffer(center, 0.001)
    const bbox = turf.bbox(buffered)
    const formattedbbox =
        bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] + ',EPSG:4326'

    const { data: wfsWarningData } = await wfsCall(
        formattedbbox,
        'uk-nfws.qgz',
        'flood_warnings'
    )
    const { data: wfsAlertData } = await wfsCall(
        formattedbbox,
        'uk-nfws.qgz',
        'flood_alerts'
    )

    const alertAreasFeatures = wfsAlertData?.features || []
    const warningAreasFeatures = wfsWarningData?.features || []
    const allAreas = alertAreasFeatures.concat(warningAreasFeatures) || []

    return allAreas
}