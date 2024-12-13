import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useState } from 'react'
import { GeoJSON, MapContainer, Marker, Popup, useMap } from 'react-leaflet'
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
import {
  convertDataToGeoJsonFeature,
  getAreaOrLength
} from '../../../../../common/services/GeoJsonHandler'

export default function ContactMap({ locations }) {
  const [loading, setLoading] = useState(true)
  const [apiKey, setApiKey] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [centre, setCentre] = useState(null)
  const [features, setFeatures] = useState(null)
  const [areaSize, setAreaSize] = useState([])

  useEffect(() => {
    loadLocationsOnMap()

    setLoading(false)
  }, [])

  const loadLocationsOnMap = () => {
    //load all locations user is connected to onto map
    const features = []

    locations.forEach((location) => {
      let feature
      const locationType =
        location.meta_data.location_additional.location_data_type

      if (locationType === LocationDataType.X_AND_Y_COORDS) {
        feature = convertDataToGeoJsonFeature('Point', location.coordinates)
      } else {
        feature = convertDataToGeoJsonFeature(
          location.geometry.geoJson.type,
          location.geometry.geoJson.coordinates
        )
      }

      features.push(feature)
    })

    const geoJsonFeatures = turf.featureCollection(features)
    setFeatures(geoJsonFeatures)

    // calculate boundary around locations
    const bbox = turf.bbox(geoJsonFeatures)

    const newBounds = L.latLngBounds([bbox[1], bbox[0]], [bbox[3], bbox[2]])
    setBounds(newBounds)

    const area = turf.bboxPolygon(bbox)
    const mapCentre = turf.center(area)
    const mapCentreCoords = mapCentre.geometry.coordinates
    setCentre([mapCentreCoords[0], mapCentreCoords[1]])

    const boundarySize = turf.area(area)
    setAreaSize(boundarySize)

    // convert locations not large enough on map
    if (locations > 1) {
      console.log()
      locations.forEach((location) => {
        let size
        const locationType =
          location.meta_data.location_additional.location_data_type

        if (locationType != LocationDataType.X_AND_Y_COORDS) {
          size = getAreaOrLength(
            location.geometry.geoJson.type,
            location.geometry.geoJson.coordinates
          )
          console.log(size)
          // if location is line and length is less than 5km then get centre and show marker instead
          // if location is polygon and area is less than 10% then of bbox then get centre show marker instead
          // convert centre to a point and add to features
        }
      })
    }
  }

  const Locations = () => {
    const map = useMap()

    useEffect(() => {
      if (features) {
        features.features.forEach((feature) => {
          //console.log(feature)
        })
      }
    }, [features])
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
          zoom={9}
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
              {features && (
                <GeoJSON data={features} style={{ color: '#ffa200' }} />
              )}
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
