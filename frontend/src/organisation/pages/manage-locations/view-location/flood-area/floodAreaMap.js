import { faArrowLeft, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useState } from 'react'
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
import iconUrl from '../../../../../common/assets/images/location_pin.svg'
import { backendCall } from '../../../../../common/services/BackendService'
import TileLayerWithHeader from '../../../../common/components/custom/TileLayerWithHeader'
import FullMapInteractiveKey from '../../../../components/custom/FullMapInteractiveKey'

export default function FloodAreaMap ({
  showMap,
  setShowMap,
  locations,
  targetArea
}) {
  const initialPosition = [Number(targetArea.properties.latitude.replace(',', '.')), Number(targetArea.properties.longitude.replace(',', '.'))]
  const initialZoom = 14

  const categoryToType = (type) => {
    const typeMap = {
      'Flood Warning': 'warning',
      'Flood Warning Groundwater': 'warning',
      'Flood Warning Rapid Response': 'warning',
      'Flood Alert': 'alert',
      'Flood Alert Groundwater': 'alert'
    }
    return typeMap[type] || []
  }

  const [apiKey, setApiKey] = useState(null)
  const alertArea = categoryToType(targetArea.properties.category) === 'alert' && targetArea
  const warningArea =  categoryToType(targetArea.properties.category) === 'warning' && targetArea
  const [mapCenter, setMapCenter] = useState({
          lat: initialPosition[0],
          lng: initialPosition[1]
        }
  )
  const [zoomLevel, setZoomLevel] = useState(initialZoom)


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

  const showWarningAreas = () => {
        layer.options.className = 'warning-area-pattern-fill'
        layer.setStyle({
          opacity: 1,
          color: '#f70202',
          weight: 2,
          fillOpacity: 0.25
        })
  }

  const showAlertAreas = () => {
        layer.options.className = 'alert-area-pattern-fill'
        layer.setStyle({
          opacity: 1,
          color: '#ffa200',
          weight: 2,
          fillOpacity: 0.5
        })
    }
  


  const onEachShapefileFeature = (feature, layer) => {
    layer.options.className = 'shapefile-area-pattern-fill'
    layer.setStyle({
      color: '#809095',
      weight: 2,
      fillOpacity: 1.0
    })
  }

  return (
    <div>
      <Modal show={showMap} onHide={handleCloseMap} fullscreen centered>
        <Modal.Body className='p-0'>
          <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ height: '100vh', width: '85%' }}>
              <MapContainer
                center={mapCenter}
                zoom={zoomLevel}
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
                {locations && locations
                  .map((location, index) => (
                    <div key={index}>
                      <Marker
                        position={[
                          location.coordinates.latitude,
                          location.coordinates.longitude
                        ]}
                      >
                        <Popup offset={[0, -25]}>
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
                      {location.geometry && (
                        <GeoJSON
                          data={location.geometry.geoJson}
                          onEachFeature={onEachShapefileFeature}
                        />
                      )}
                    </div>
                  ))}
                {warningArea && (
                  <GeoJSON
                    key={warningArea}
                    data={warningArea}
                    onEachFeature={showWarningAreas}
                    style={{ color: '#f70202' }}
                  />
                )}
                {alertArea && (
                  <GeoJSON
                    key={alertArea}
                    data={alertArea}
                    onEachFeature={showAlertAreas}
                    style={{ color: '#ffa200' }}
                  />
                )}
              </MapContainer>
            </div>

            <div style={{ width: '15%', padding: '20px', overflowY: 'auto' }}>
              <FullMapInteractiveKey
                locations={locations}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
