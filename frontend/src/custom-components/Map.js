import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup, ZoomControl,
  useMap
} from 'react-leaflet'
import { useSelector } from 'react-redux'
import { getFloodTargetArea } from '../services/GetFloodTargetAreas'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { backendCall } from '../services/BackendService'
import TitleLayerWithHeader from './TitleLayerWithHeader'

export default function Map ({ types }) {
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const { latitude, longitude } = selectedLocation.coordinates
  const [apiKey, setApiKey] = useState(null)

  useEffect(() => {
    async function fetchFloodAreaData () {
      const { alertArea, warningArea } = await getFloodTargetArea(
        latitude,
        longitude
      )
      setAlertArea(alertArea)
      setWarningArea(warningArea)
    }
    fetchFloodAreaData()
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

  const ResetMapButton = () => {
    const map = useMap()

    const handleClick = () => {
      map.setView([latitude, longitude], 14)
    }

    return (
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '12px',
          zIndex: 1000,
          background: 'white',
          padding: '3px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faRotateLeft} size='2x' />
      </div>
    )
  }

  async function getApiKey () {
    const { data } = await backendCall(
      'data',
      'api/os-api/oauth2'
    )
    console.log(data)
    setApiKey(data.access_token)
    console.log('api key set')
    return data.expires_in
  }

  useEffect(() => {
    return () => {getApiKey()}
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {getApiKey()}, 270000)
    return () => {clearInterval(interval)}
  }, [])

  const url = 'https://api.os.uk/maps/raster/v1/wmts'
  const parameters = {
    tileMatrixSet: encodeURI('EPSG:3857'),
    version: '1.0.0',
    style: 'default',
    layer: encodeURI('Outdoor_3857'),
    service: 'WMTS',
    request: 'GetTile',
    tileCol: '{x}',
    tileRow: '{y}',
    tileMatrix: '{z}'
  }

  let parameterString = Object.keys(parameters)
    .map(function(key) { return key + '=' + parameters[key]})
    .join('&')

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        className='map-container'
      >
        <TitleLayerWithHeader url={url + '?' + parameterString} token={apiKey} />
        <ZoomControl position='bottomright' />
        <Marker position={[latitude, longitude]}>
          <Popup />
        </Marker>
        {warningArea && types.includes('warning') && (
          <GeoJSON data={warningArea} style={{ color: '#f70202' }} />
        )}
        {alertArea && types.includes('alert') && (
          <GeoJSON data={alertArea} style={{ color: '#ffa200' }} />
        )}
        <ResetMapButton />
      </MapContainer>
    </>
  )
}
