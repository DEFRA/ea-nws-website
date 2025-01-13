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
import LoadingSpinner from '../../../../../../common/components/custom/LoadingSpinner'
import TileLayerWithHeader from '../../../../../../common/components/custom/TileLayerWithHeader'
import LocationDataType from '../../../../../../common/enums/LocationDataType'
import { backendCall } from '../../../../../../common/services/BackendService'
import { convertDataToGeoJsonFeature } from '../../../../../../common/services/GeoJsonHandler'

export default function ContactMap({ locations }) {
  const [loading, setLoading] = useState(true)
  const [apiKey, setApiKey] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [markers, setMarkers] = useState([])
  const [geoJsonShapes, setGeoJsonShapes] = useState([])

  useEffect(() => {
    loadLocationsOnMap()
    setLoading(false)
  }, [])

  const loadLocationsOnMap = () => {
    //load all locations user is connected to onto map
    const locationsCollection = []
    const points = []
    const shapes = []
    if (locations) {
      locations.forEach((location) => {
        let feature
        const locationType =
          location.meta_data.location_additional.location_data_type

        // add all points to markers which can be represented on the map
        // we need to convert points to geojson so we can calculate the bbox
        if (locationType === LocationDataType.X_AND_Y_COORDS) {
          // turf accepts in the format [lng,lat] - we save points as [lat,lng]
          feature = convertDataToGeoJsonFeature('Point', [
            location.coordinates[1],
            location.coordinates[0]
          ])
          points.push(location.coordinates)
        } else {
          feature = location.geometry.geoJson
          setGeoJsonShapes((prevShapes) => [
            ...prevShapes,
            location.geometry.geoJson
          ])
          shapes.push(location.geometry.geoJson)
        }

        locationsCollection.push(feature)
      })
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
          center={[0, 0]}
          dragging={true}
          scrollWheelZoom={true}
          zoom={8}
          minZoom={7}
          zoomControl={true}
          attributionControl={false}
          maxBounds={maxBounds}
          className={'contacts-map-container'}
        >
          {apiKey && apiKey !== 'error' ? (
            <>
              {tileLayerWithHeader}
              {markers &&
                markers.map((marker, index) => (
                  <Marker key={index} position={[marker[0], marker[1]]}>
                    <Popup />
                  </Marker>
                ))}
              {geoJsonShapes.map((shape, index) => (
                <GeoJSON key={index} data={shape} />
              ))}

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
