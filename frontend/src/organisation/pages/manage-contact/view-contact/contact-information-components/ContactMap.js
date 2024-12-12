import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
// Leaflet Marker Icon fix
import * as turf from '@turf/turf'
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import TileLayerWithHeader from '../../../../../common/components/custom/TileLayerWithHeader'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import { backendCall } from '../../../../../common/services/BackendService'

export default function ContactMap({ locations }) {
  const [loading, setLoading] = useState(true)
  const [apiKey, setApiKey] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [centre, setCentre] = useState(null)
  const [areaSize, setAreaSize] = useState([])
  const [markers, setMarkers] = useState([])
  // const [lines, setLines] = useState([])
  // const [polygons, setPolygons] = useState([])

  useEffect(() => {
    if (locations.length === 1) {
      fitMapToSingleLocation()
    } else {
      getBoundaryBoxOfAllLocations()
      //handleLocations()
    }

    setLoading(false)
  }, [])

  const fitMapToSingleLocation = () => {
    const singleLocation = locations[0]
    let bbox
    switch (singleLocation.meta_data.location_additional.location_data_type) {
      case LocationDataType.X_AND_Y_COORDS:
        const point = turf.point(singleLocation.coordinates)
        const bufferedPoint = turf.buffer(point, 0.5, { units: 'kilometers' })
        bbox = turf.bbox(bufferedPoint)
        break

      case LocationDataType.SHAPE_LINE:
        // confirm with kevin - can line shapes only be a set of 2 coords?
        const line = turf.lineString(singleLocation?.geometry?.geoJson)
        bbox = turf.bbox(line)
        break

      case LocationDataType.SHAPE_POLYGON || LocationDataType.BOUNDARY:
        const shapePoints = turf.points(singleLocation?.geometry?.geoJson)
        bbox = turf.bbox(turf.featureCollection(shapePoints))
        break
    }

    console.log('single point bbox', bbox)
    const newBounds = L.latLngBounds([bbox[1], bbox[0]], [bbox[3], bbox[2]])
    setBounds(newBounds)
  }

  const isPolygon = (geoJson) => {
    return (
      Array.isArray(geoJson) &&
      geoJson.length === 1 &&
      Array.isArray(geoJson[0]) &&
      !Array.isArray(geoJson[0][0][0])
    )
  }

  const isMultiPolygon = (geoJson) => {
    return (
      Array.isArray(geoJson) &&
      geoJson.length > 1 &&
      Array.isArray(geoJson[0][0]) &&
      Array.isArray(geoJson[0][0][0])
    )
  }

  const getBoundaryBoxOfAllLocations = () => {
    const centrePoints = []

    locations.forEach((location, index) => {
      switch (location.meta_data.location_additional.location_data_type) {
        case LocationDataType.X_AND_Y_COORDS:
          centrePoints.push(turf.point(location.coordinates))
          break

        case LocationDataType.SHAPE_LINE:
          // confirm with kevin - can line shapes only be a set of 2 coords?
          const line = turf.lineString(location?.geometry?.geoJson)
          const centre = turf.center(line)
          centrePoints.push(turf.point(centre.geometry.coordinates))
          break

        case LocationDataType.SHAPE_POLYGON || LocationDataType.BOUNDARY:
          // need a way here to figure if shape is a polygon or a multipolygon

          const areaPoints = turf.points(location?.geometry?.geoJson)
          const areaCentre = turf.center(areaPoints)

          centrePoints.push(turf.point(areaCentre.geometry.coordinates))
          break
      }
    })

    setMarkers(centrePoints)

    const bbox = turf.bbox(turf.featureCollection(centrePoints))

    const newBounds = L.latLngBounds([bbox[1], bbox[0]], [bbox[3], bbox[2]])
    setBounds(newBounds)

    const area = turf.bboxPolygon(bbox)
    const mapCentre = turf.center(area)
    const mapCentreCoords = mapCentre.geometry.coordinates
    setCentre([mapCentreCoords[0], mapCentreCoords[1]])

    const boundarySize = turf.area(area)
    setAreaSize(boundarySize)
  }

  const handleLocations = () => {
    locations.forEach((location) => {
      if (
        location.meta_data.location_additional.location_data_type ===
        LocationDataType.X_AND_Y_COORDS
      ) {
        setMarkers(...markers, location)
      }
    })
  }

  const FitBounds = () => {
    const map = useMap()

    useEffect(() => {
      if (bounds) {
        map.fitBounds(bounds)
      }
    }, [bounds])
  }

  async function getApiKey() {
    const { errorMessage, data } = await backendCall(
      'data',
      'api/os-api/oauth2'
    )
    if (!errorMessage) {
      setApiKey(data.access_token)
    } else {
      setApiKey('error')
    }
  }

  useEffect(() => {
    getApiKey()
    const interval = setInterval(() => {
      getApiKey()
    }, 270000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // Leaflet Marker Icon fix
  const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon

  const url = 'https://api.os.uk/maps/raster/v1/wmts'
  const parameters = {
    tileMatrixSet: encodeURI('EPSG:3857'),
    version: '2.0.0',
    style: 'default',
    layer: encodeURI('Outdoor_3857'),
    service: 'WMTS',
    request: 'GetTile',
    tileCol: '{x}',
    tileRow: '{y}',
    tileMatrix: '{z}'
  }

  const parameterString = Object.keys(parameters)
    .map(function (key) {
      return key + '=' + parameters[key]
    })
    .join('&')

  const maxBounds = [
    [49.528423, -10.76418],
    [61.331151, 1.9134116]
  ]

  const tileLayerWithHeader = useMemo(
    () => (
      <TileLayerWithHeader
        url={url + '?' + parameterString}
        token={apiKey}
        bounds={maxBounds}
      />
    ),
    [apiKey]
  )

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <MapContainer
          center={centre}
          dragging={false}
          scrollWheelZoom={false}
          zoom={7}
          zoomControl={false}
          attributionControl={false}
          maxBounds={maxBounds}
          className={'contacts-map-container'}
        >
          {apiKey && apiKey !== 'error' ? (
            <>
              {tileLayerWithHeader}
              <Marker position={[centre[0], centre[1]]}>
                <Popup />
              </Marker>
              {markers &&
                markers.map((marker) => {
                  return (
                    <Marker
                      position={[
                        marker.geometry.coordinates[0],
                        marker.geometry.coordinates[1]
                      ]}
                    >
                      <Popup />
                    </Marker>
                  )
                })}
              <FitBounds />
            </>
          ) : (
            <div className='map-error-container'>
              <p className='govuk-body-l govuk-!-margin-bottom-1'>Map Error</p>
              <Link className='govuk-body-s' onClick={() => getApiKey()}>
                Reload map
              </Link>
            </div>
          )}
        </MapContainer>
      )}
    </>
  )
}
