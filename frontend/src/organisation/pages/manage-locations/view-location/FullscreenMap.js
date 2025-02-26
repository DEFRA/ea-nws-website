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
import FullMapInteractiveKey from '../../../components/custom/FullMapInteractiveKey'

export default function FullscreenMap ({
  showMap,
  setShowMap,
  locations,
  targetArea,
  filteredLocations
}) {
  const initialPosition = filteredLocations
    ? [52.7152, -1.17349]
    : targetArea ? [Number(area.properties.latitude.replace(',', '.')), Number(area.properties.longitude.replace(',', '.'))]
    : [locations[0].coordinates.latitude, locations[0].coordinates.longitude]
  const initialZoom = filteredLocations ? 7 : 14

  const [apiKey, setApiKey] = useState(null)
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const [mapCenter, setMapCenter] = useState(
    filteredLocations
      ? null
      : {
          lat: initialPosition[0],
          lng: initialPosition[1]
        }
  )
  const [zoomLevel, setZoomLevel] = useState(initialZoom)
  const [showFloodWarningAreas, setShowFloodWarningAreas] = useState(true)
  const [showFloodAlertAreas, setShowFloodAlertAreas] = useState(true)
  const [showFloodExtents, setShowFloodExtents] = useState(true)
  const [alertAreaRefVisible, setAlertAreaRefVisible] = useState(false)
  const [warningAreaRefVisible, setWarningAreaRefVisible] = useState(false)

  const [showLocationsWithinFloodAreas, setShowLocationsWithinFloodAreas] =
    useState(true)
  const [showLocationsOutsideFloodAreas, setShowLocationsOutsideFloodAreas] =
    useState(false)
  const [showOnlyFilteredLocations, setShowOnlyFilteredLocations] =
    useState(true)

  const [mapLocations, setMapLocations] = useState(
    filteredLocations || locations
  )

  useEffect(() => {
    if (filteredLocations && showOnlyFilteredLocations) {
      setMapLocations(filteredLocations)
    } else {
      setMapLocations(locations)
    }
  }, [showOnlyFilteredLocations])

  useEffect(() => {
    if (!filteredLocations) setShowLocationsOutsideFloodAreas(true)
  }, [])

  // Get flood area data
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

  useEffect(() => {
    showAreas()
  }, [showFloodWarningAreas, showFloodAlertAreas])

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
  const shapefileRef = useRef(null)

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
    if (warningAreaRefVisible && warningAreaRef.current) {
      warningAreaRef.current.eachLayer((layer) => {
        layer.options.className = 'warning-area-pattern-fill'
        layer.setStyle({
          opacity: 1,
          color: '#f70202',
          weight: 2,
          fillOpacity: 0.25
        })
        layer.bringToFront()
      })
    }
  }

  const showAlertAreas = () => {
    if (alertAreaRefVisible && alertAreaRef.current) {
      alertAreaRef.current.eachLayer((layer) => {
        layer.options.className = 'alert-area-pattern-fill'
        layer.setStyle({
          opacity: 1,
          color: '#ffa200',
          weight: 2,
          fillOpacity: 0.5
        })
      })
    }
  }

  // TODO: Add functionality to show/hide flood extent areas

  const hideWarningArea = () => {
    if (warningAreaRefVisible && warningAreaRef.current) {
      warningAreaRef.current.eachLayer((layer) => {
        layer.setStyle({ opacity: 0, fillOpacity: 0 })
      })
      setWarningAreaRefVisible(false)
    }
  }

  const hideAlertArea = () => {
    if (alertAreaRefVisible && alertAreaRef.current) {
      alertAreaRef.current.eachLayer((layer) => {
        layer.setStyle({ opacity: 0, fillOpacity: 0 })
      })
      setAlertAreaRefVisible(false)
    }
  }

  const showAreas = () => {
    if (showFloodWarningAreas && showFloodAlertAreas) {
      showAlertAreas()
      showWarningAreas()
    } else if (showFloodWarningAreas) {
      showWarningAreas()
      hideAlertArea()
    } else if (showFloodAlertAreas) {
      showAlertAreas()
      hideWarningArea()
    } else {
      hideWarningArea()
      hideAlertArea()
    }
  }

  // Check if location has alert type
  const locationHasAlertType = (location) => {
    const alertTypes = location.additionals.other?.alertTypes?.length

    // Needed to parse current location structure in redux
    const parsedAlertTypes = location.additionals[4]
      ? JSON.parse(location.additionals[4]?.value?.s).alertTypes?.length
      : 0
    return alertTypes || parsedAlertTypes
  }

  // Display locations with alerts
  const displayLocationsWithAlerts = (location) => {
    const { latitude, longitude } = location.coordinates
    const isValidLocation = latitude && longitude
    const isInFloodArea =
      showLocationsWithinFloodAreas && locationHasAlertType(location)
    const isOutsideFloodArea =
      showLocationsOutsideFloodAreas && !locationHasAlertType(location)

    return isValidLocation && (isInFloodArea || isOutsideFloodArea)
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
                {mapLocations && mapLocations
                  .filter(displayLocationsWithAlerts)
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
                            {location.additionals.locationName ||
                              location.additionals[0].value.s}
                          </Link>
                          <br />
                          {filteredLocations
                            ? location.additionals.other.location_type
                            : JSON.parse(location.additionals[4]?.value?.s)
                              .location_type}
                          <br />
                          {location.address}
                        </Popup>
                      </Marker>
                      {location.geometry && (
                        <GeoJSON
                          data={location.geometry}
                          onEachFeature={onEachShapefileFeature}
                          ref={(el) => {
                            shapefileRef.current = el
                          }}
                        />
                      )}
                    </div>
                  ))}
                {warningArea && (
                  <GeoJSON
                    key={warningArea}
                    data={warningArea}
                    style={{ color: '#f70202' }}
                    ref={(el) => {
                      warningAreaRef.current = el
                      setWarningAreaRefVisible(true)
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
                      setAlertAreaRefVisible(true)
                    }}
                  />
                )}
              </MapContainer>
            </div>

            <div style={{ width: '15%', padding: '20px', overflowY: 'auto' }}>
              <FullMapInteractiveKey
                showFloodWarningAreas={showFloodWarningAreas}
                setShowFloodWarningAreas={setShowFloodWarningAreas}
                showFloodAlertAreas={showFloodAlertAreas}
                setShowFloodAlertAreas={setShowFloodAlertAreas}
                showFloodExtents={showFloodExtents}
                setShowFloodExtents={setShowFloodExtents}
                showLocationsWithinFloodAreas={showLocationsWithinFloodAreas}
                setShowLocationsWithinFloodAreas={
                  setShowLocationsWithinFloodAreas
                }
                showLocationsOutsideFloodAreas={showLocationsOutsideFloodAreas}
                setShowLocationsOutsideFloodAreas={
                  setShowLocationsOutsideFloodAreas
                }
                showOnlyFilteredLocations={showOnlyFilteredLocations}
                setShowOnlyFilteredLocations={setShowOnlyFilteredLocations}
                locations={
                  showOnlyFilteredLocations ? filteredLocations : locations
                }
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
