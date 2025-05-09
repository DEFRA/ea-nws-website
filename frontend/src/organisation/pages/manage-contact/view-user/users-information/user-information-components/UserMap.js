import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap
} from 'react-leaflet'
import { Link } from 'react-router-dom'
// Leaflet Marker Icon fix
import * as turf from '@turf/turf'
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import locationPin from '../../../../../../common/assets/images/location_pin.svg'
import LoadingSpinner from '../../../../../../common/components/custom/LoadingSpinner'
import TileLayerWithHeader from '../../../../../../common/components/custom/TileLayerWithHeader'
import LocationDataType from '../../../../../../common/enums/LocationDataType'
import { backendCall } from '../../../../../../common/services/BackendService'
import { convertDataToGeoJsonFeature } from '../../../../../../common/services/GeoJsonHandler'

export default function UserMap ({ locations }) {
  const [loading, setLoading] = useState(true)
  const [apiKey, setApiKey] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [markers, setMarkers] = useState([])
  const [geoJsonShapes, setGeoJsonShapes] = useState([])
  const [centre, setCentre] = useState([])

  useEffect(() => {
    loadLocationsOnMap()
    setLoading(false)
  }, [locations])

  const loadLocationsOnMap = () => {
    // load all locations user is connected to onto map
    const locationsCollection = []
    const points = []
    const shapes = []
    if (locations && locations.length > 0) {
      // centre must be set to 0, 0 as map will be fit accordingly to locations loaded
      setCentre([0, 0])
      locations.forEach((location) => {
        let feature
        const locationType = location.additionals.other.location_data_type

        if (locationType) {
          // add all points to markers which can be represented on the map
          // we need to convert points to geojson so we can calculate the bbox
          if (locationType === LocationDataType.X_AND_Y_COORDS) {
            // turf accepts in the format [lng,lat] - we save points as [lat,lng]
            feature = convertDataToGeoJsonFeature('Point', [
              location.coordinates.longitude,
              location.coordinates.latitude
            ])
            points.push(location.coordinates)
          } else {
            feature = location.geometry.geoJson

            shapes.push(feature)
          }

          locationsCollection.push(feature)
        }
      })

      if (locationsCollection) {
        setMarkers(points)
        setGeoJsonShapes(shapes)

        const geoJsonFeatureCollection =
          turf.featureCollection(locationsCollection)

        // calculate boundary around locations
        const bbox = turf.bbox(geoJsonFeatureCollection)

        const newBounds = [
          [bbox[1], bbox[0]],
          [bbox[3], bbox[2]]
        ]
        setBounds(newBounds)
      }
    }
    // no linked locations, setting to centre of England
    setCentre([52.7152, -1.17349])
  }

  // Auto fit the map to loaded locations (with a bit of padding)
  const FitBounds = () => {
    const map = useMap()

    useEffect(() => {
      if (bounds) {
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    }, [bounds])
  }

  async function getApiKey () {
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
    iconUrl: locationPin,
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

  const osmTileLayer = useMemo(
    () => (
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© OpenStreetMap contributors'
      />
    ),
    []
  )

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <MapContainer
          zoom={6.5}
          zoomSnap={0.1} // Allow fractional zoom
          center={centre}
          dragging={false}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          maxBounds={maxBounds}
          className='contacts-map-container'
        >
          {osmTileLayer}
          {apiKey && apiKey !== 'error' ? (
            <>
              {tileLayerWithHeader}
              {markers &&
                markers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={[marker.latitude, marker.longitude]}
                  >
                    <Popup />
                  </Marker>
                ))}
              {geoJsonShapes &&
                geoJsonShapes.map((shape, index) => (
                  <GeoJSON key={index} data={shape} />
                ))}
              {/* Only zoom to markers when present */}
              {markers.length > 0 && <FitBounds />}
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
