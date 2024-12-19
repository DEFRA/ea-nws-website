import { faArrowLeft, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
  useMapEvents
} from 'react-leaflet'
import { Link } from 'react-router-dom'
import iconUrl from '../../../../common/assets/images/location_pin.svg'

import TileLayerWithHeader from '../../../../common/components/custom/TileLayerWithHeader'
import { backendCall } from '../../../../common/services/BackendService'
import { getSurroundingFloodAreas } from '../../../../common/services/WfsFloodDataService'

export default function FullscreenMap ({ showMap, setShowMap, locations }) {
  const [apiKey, setApiKey] = useState(null)
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const [mapCenter, setMapCenter] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(null)

  const initialPosition = [52.7152, -1.17349]
  const initialZoom = 7

  // Get flood area data
  useEffect(() => {
    async function fetchFloodAreaData () {}
    fetchFloodAreaData()
  }, [])

  useEffect(() => {
    async function fetchFloodAreaData () {
      if (zoomLevel >= 12 && mapCenter) {
        const { alertArea, warningArea } = await getSurroundingFloodAreas(
          mapCenter.lat,
          mapCenter.lng,
          2
        )
        setAlertArea(alertArea)
        setWarningArea(warningArea)
      }
    }
    fetchFloodAreaData()
  }, [mapCenter, zoomLevel])

  const ZoomTracker = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom())
      },
      moveend: () => {
        const center = map.getCenter()
        setMapCenter({ lat: center.lat, lng: center.lng })
      }
    })

    return null
  }

  // Leaflet Marker Icon
  const DefaultIcon = L.icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })
  L.Marker.prototype.options.icon = DefaultIcon

  async function getApiKey () {
    const { data } = await backendCall('data', 'api/os-api/oauth2')
    setApiKey(data.access_token)
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

  const osmTileLayer = useMemo(
    () => (
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© OpenStreetMap contributors'
      />
    ),
    []
  )

  useEffect(() => {
    if (zoomLevel < 12) {
      if (warningAreaRef.current) {
        warningAreaRef.current.clearLayers()
      }
      if (alertAreaRef.current) {
        alertAreaRef.current.clearLayers()
      }
      setAlertArea(null)
      setWarningArea(null)
    }
  }, [zoomLevel])

  const alertAreaRef = useRef(null)
  const warningAreaRef = useRef(null)

  const handleCloseMap = () => {
    setShowMap(false)
  }

  const ResetMapButton = () => {
    const map = useMap()

    const handleReset = () => {
      map.setView(initialPosition, initialZoom)
    }

    return (
      <button
        style={{
          position: 'absolute',
          bottom: '75px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          cursor: 'pointer',
          borderRadius: '4px',
          width: '35px',
          height: '35px'
        }}
        onClick={handleReset}
      >
        <FontAwesomeIcon
          icon={faRedoAlt}
          style={{
            fontSize: '16px',
            transform: 'scaleX(-1)'
          }}
        />
      </button>
    )
  }

  const ExitMapButton = () => {
    return (
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          padding: '5px 10px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
        onClick={handleCloseMap}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{
            fontSize: '16px',
            marginRight: '5px'
          }}
        />
        Exit map
      </button>
    )
  }

  return (
    <div>
      <Modal show={showMap} onHide={handleCloseMap} fullscreen centered>
        <Modal.Body className='p-0'>
          <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ height: '100vh', width: '80%' }}>
              <MapContainer
                center={initialPosition}
                zoom={initialZoom}
                zoomControl={false}
                attributionControl={false}
                minZoom={7}
                maxBounds={maxBounds}
                style={{ width: '100%', height: '100%' }}
              >
                {osmTileLayer}
                {apiKey && tileLayerWithHeader}
                <ZoomControl position='bottomright' />
                <ZoomTracker />
                <ResetMapButton />
                <ExitMapButton />
                {locations
                  .filter(
                    (location) =>
                      location.coordinates.latitude &&
                      location.coordinates.longitude
                  )
                  .map((location, index) => (
                    <Marker
                      key={index}
                      position={[
                        location.coordinates.latitude,
                        location.coordinates.longitude
                      ]}
                    >
                      <Popup>
                        <Link
                          className='govuk-link'
                          // onClick={(e) => viewLocation(e, location)}
                        >
                          {location.additionals.locationName}
                        </Link>
                        <br />
                        {location.additionals.other.location_type}
                        <br />
                        {location.address}
                      </Popup>
                    </Marker>
                  ))}
                {warningArea && (
                  <GeoJSON
                    key={warningArea}
                    data={warningArea}
                    style={{ color: '#f70202' }}
                    ref={(el) => {
                      warningAreaRef.current = el
                    }}
                  />
                )}
                {alertArea && (
                  <GeoJSON
                    key={alertArea}
                    data={alertArea}
                    style={{ color: '#ffa200' }}
                    ref={(el) => {
                      alertAreaRef.current = el
                    }}
                  />
                )}
              </MapContainer>
            </div>

            <div style={{ width: '20%', padding: '20px', overflowY: 'auto' }}>
              <h4>
                <strong>Key</strong>
              </h4>
              <hr />
              <strong>Flood areas</strong>

              <hr />
              <strong>Locations ({locations.length})</strong>

              <hr />
              <strong>Location filter</strong>

              <hr />
              <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
                This is not a live flood map
              </span>
              <span className='govuk-caption-m govuk-!-font-size-16'>
                It shows fixed areas we provide flood warnings and alerts for.
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
