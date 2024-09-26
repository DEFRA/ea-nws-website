import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  MapContainer,
  Marker, ZoomControl,
  useMap,
  useMapEvents
} from 'react-leaflet'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TileLayerWithHeader from '../../../common/components/custom/TileLayerWithHeader'
import { backendCall } from '../../../common/services/BackendService'

export default function Map ({
  type,
  setCoordinates
}) {
  const coordinates = useSelector((state) => state.session.currentLocation.coordinates)
  const { latitude, longitude } = coordinates
  const [apiKey, setApiKey] = useState(null)
  const [marker, setMarker] = useState(null)
  const center = [latitude, longitude]

  // reset the map to selected location
  const ResetMapButton = () => {
    const map = useMap()

    const handleClick = () => {
      map.setView([latitude, longitude], 14)
    }

    return (
      <div className='reset-map-button' onClick={handleClick}>
        <FontAwesomeIcon icon={faRotateLeft} size='2x' />
      </div>
    )
  }

  // Leaflet Marker Icon fix
  const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon

  async function getApiKey () {
    const { errorMessage, data } = await backendCall('data', 'api/os-api/oauth2')
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
  const ref = useRef(null)

  function AddMarker () {
    useMapEvents({
      click: (e) => {
        const mapHeight = ref.current.clientHeight
        const mapWidth = ref.current.clientWidth
        const { x, y } = e.containerPoint
        if (!(
          (x > (mapWidth - 30) && x < (mapWidth - 9)) &&
          (y > (mapHeight - 110) && y < (mapHeight - 77))
        )) {
          const { lat, lng } = e.latlng
          setMarker([lat, lng])
          setCoordinates({ latitude: lat, longitude: lng })
        }
      }
    })
    return (
      marker && (<Marker position={marker} interactive={false} />)
    )
  }

  return (
    <div ref={ref}>
      <MapContainer
        center={center}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        minZoom={7}
        maxBounds={maxBounds}
        className='map-container'
      >
        {apiKey &&
           (apiKey !== 'error'
             ? (
               <>
                 {tileLayerWithHeader}
                 <ZoomControl position='bottomright' />
                 <ResetMapButton />
                 {type === 'drop' ? <AddMarker /> : <Marker position={center} interactive={false} />}
               </>
               )
             : (
               <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                 <p className='govuk-body-l govuk-!-margin-bottom-1'>Map Error</p>
                 <Link className='govuk-body-s' onClick={() => getApiKey()}>Reload map</Link>
               </div>
               ))}
      </MapContainer>
    </div>
  )
}
