import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap'
import {
  GeoJSON,
  MapContainer,
  Marker, TileLayer,
  ZoomControl,
  useMap,
  useMapEvents
} from 'react-leaflet'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import iconUrl from '../../../../../common/assets/images/location_pin.svg'
import iconClickedUrl from '../../../../../common/assets/images/location_pin_clicked.svg'
import TileLayerWithHeader from '../../../../../common/components/custom/TileLayerWithHeader'
import { setCurrentLocation, setCurrentTA } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { getFloodAreaByTaName } from '../../../../../common/services/WfsFloodDataService'
import { webToGeoSafeLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { createShapefilePattern } from '../../../../components/custom/FloodAreaPatterns'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import FloodAreaMapKey from './FloodAreaMapKey'

export default function FloodAreaMap ({
  showMap,
  setShowMap,
  locations,
  targetArea
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [locationInformationActive, setLocationInformationActive] = useState(false)
  const [clickedLocation, setClickedLocation] = useState(null)
  const [showLocationsWithinFloodAreas, setShowLocationsWithinFloodAreas] =
    useState(true)
  const [showLocationsOutsideFloodAreas, setShowLocationsOutsideFloodAreas] =
    useState(true)
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

  // Display locations with alerts
  const displayLocationsWithAlerts = (location) => {
    const isInFloodArea =
      showLocationsWithinFloodAreas && location?.within === true
    const isOutsideFloodArea =
      showLocationsOutsideFloodAreas && location?.within === false

    return (isInFloodArea || isOutsideFloodArea)
  }

  const [apiKey, setApiKey] = useState(null)
  const alertArea = categoryToType(targetArea.properties.category) === 'alert' && targetArea
  const warningArea = categoryToType(targetArea.properties.category) === 'warning' && targetArea
  const [mapCenter, setMapCenter] = useState({
    lat: initialPosition[0],
    lng: initialPosition[1]
  }
  )
  const [zoomLevel, setZoomLevel] = useState(initialZoom)

  useEffect(() => {
    createShapefilePattern()
  }, [])

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
    iconSize: [53, 69],
    iconAnchor: [26, 69]
  })

  const ClickedIcon = L.icon({
    iconUrl: iconClickedUrl,
    iconSize: [53, 69],
    iconAnchor: [26, 69]
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

  const onTAClick = async (e, areaName) => {
    e.preventDefault()
    const floodArea = await getFloodAreaByTaName(areaName)
    dispatch(setCurrentTA(floodArea))
    setShowMap(false)
    navigate(orgManageLocationsUrls.view.viewFloodArea)
  }

  const viewLocation = (e, location) => {
    e.preventDefault()
    dispatch(setCurrentLocation(webToGeoSafeLocation(location)))
    navigate(orgManageLocationsUrls.view.viewLocation)
  }

  const LocationInformation = () => {
    const formattedAddress = clickedLocation ? clickedLocation.address?.split(',') : ''
    const title = clickedLocation
      ? (
        <Link
          onClick={(e) => viewLocation(e, clickedLocation)}
        >
          {clickedLocation.additionals.locationName}
        </Link>
        )
      : `${locations.length} location${locations.length === 1 ? ' is' : 's are'} in or linked to this flood ${categoryToType(targetArea.properties.category)} area`
    const content = clickedLocation
      ? (
        <span style={{ padding: '0 15px 15px 15px', display: 'block' }}>
          {clickedLocation.additionals.other.location_type && <p className='govuk-body'>{clickedLocation.additionals.other.location_type}</p>}
          <p className='govuk-body'>
            {formattedAddress.map((line, index) => {
              return (
                <span key={index}>
                  {line}
                  <br />
                </span>
              )
            })}
          </p>
        </span>
        )
      : (
        <span style={{ padding: '0 15px 15px 15px', display: 'block' }}>
          <Link
            onClick={(e) => onTAClick(e, targetArea.properties.TA_Name)}
            className='govuk-body govuk-linkgovuk-!-margin-0'
          >
            {targetArea.properties.TA_Name}
          </Link>
        </span>
        )
    return (
      <div style={
        {
          position: 'absolute',
          left: '10px',
          bottom: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          width: '400px'
        }
}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        >
          <span
            className='govuk-heading-s govuk-!-margin-0'
            style={{ padding: '15px' }}
          >
            {title}
          </span>
          <svg
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => {
              setLocationInformationActive(false)
              setClickedLocation(null)
            }}
          >
            <rect width='40' height='40' fill='white' />
            <g clip-path='url(#clip0_5588_113377)'>
              <path d='M20 18.6L25.6 13L27 14.4L21.4 20L27 25.6L25.6 27L20 21.4L14.4 27L13 25.6L18.6 20L13 14.4L14.4 13L20 18.6Z' fill='#0B0C0C' stroke='#0B0C0C' stroke-width='0.1' />
            </g>
            <defs>
              <clipPath id='clip0_5588_113377'>
                <rect width='14' height='14' fill='white' transform='translate(13 13)' />
              </clipPath>
            </defs>
          </svg>
        </div>
        {content}
      </div>
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
          padding: '10px',
          backgroundColor: 'white',
          cursor: 'pointer',
          border: 'none',
          fontSize: '16px',
          fontFamily: '"GDS Transport", arial, sans-serif'
        }}
        onClick={handleCloseMap}
      >
        <span className='govuk-!-margin-right-2'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g clip-path='url(#clip0_5588_113337)'>
              <path d='M4.828 11.0006L12.314 18.4856L10.899 19.8996L1 10.0006L10.899 0.101562L12.314 1.51556L4.828 9.00056H19V11.0006H4.828Z' fill='#0B0C0C' stroke='#0B0C0C' stroke-width='0.1' />
            </g>
            <defs>
              <clipPath id='clip0_5588_113337'>
                <rect width='20' height='20' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </span>

        Exit map
      </button>
    )
  }

  const showWarningAreas = (feature, layer) => {
    layer.setStyle({
      opacity: 0.4,
      color: '#E1414B',
      weight: 2,
      fillOpacity: 0.4,
      stroke: false
    })
    layer.on({
      click: () => {
        setClickedLocation(false)
        setLocationInformationActive(true)
        layer.setStyle({
          opacity: 1,
          fillColor: '#E1414B',
          fillOpacity: 0.4,
          color: '#000000',
          stroke: true,
          weight: 3

        })
      },
      mouseout: () => {
        layer.setStyle({
          opacity: 0.4,
          color: '#E1414B',
          weight: 2,
          fillOpacity: 0.4,
          stroke: false
        })
      }
    })
  }

  const showAlertAreas = (feature, layer) => {
    layer.setStyle({
      opacity: 0.4,
      color: '#ED9E4A',
      weight: 2,
      fillOpacity: 0.4,
      stroke: false
    })
    layer.on({
      click: () => {
        setClickedLocation(false)
        setLocationInformationActive(true)
        layer.setStyle({
          opacity: 1,
          fillColor: '#ED9E4A',
          fillOpacity: 0.4,
          color: '#000000',
          stroke: true,
          weight: 3

        })
      },
      mouseout: () => {
        layer.setStyle({
          opacity: 0.4,
          color: '#ED9E4A',
          weight: 2,
          fillOpacity: 0.4,
          stroke: false
        })
      }
    })
  }

  const onEachShapefileFeature = (feature, layer, location) => {
    layer.options.className = 'shapefile-area-pattern-fill'
    layer.setStyle({
      color: '#809095',
      weight: 2,
      fillOpacity: 1.0
    })
    layer.on({
      click: () => {
        setClickedLocation(location)
        setLocationInformationActive(true)
      }
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
                {locationInformationActive && <LocationInformation />}
                {locations && locations.filter(displayLocationsWithAlerts)
                  .map((location, index) => (
                    <div key={index}>
                      {location?.coordinates &&
                        <Marker
                          position={[
                            location.coordinates.latitude,
                            location.coordinates.longitude
                          ]}
                          icon={clickedLocation ? ClickedIcon : DefaultIcon}
                          eventHandlers={{
                            click: () => {
                              setClickedLocation(location)
                              setLocationInformationActive(true)
                            }
                          }}
                        />}
                      {location?.geometry?.geoJson && (
                        <GeoJSON
                          data={location.geometry.geoJson}
                          onEachFeature={(feature, layer) => onEachShapefileFeature(feature, layer, location)}
                        />
                      )}
                    </div>
                  ))}
                {warningArea && (
                  <GeoJSON
                    key={warningArea}
                    data={warningArea}
                    onEachFeature={showWarningAreas}
                  />
                )}
                {alertArea && (
                  <GeoJSON
                    key={alertArea}
                    data={alertArea}
                    onEachFeature={showAlertAreas}
                  />
                )}
              </MapContainer>
            </div>

            <div style={{ width: '315px', padding: '15px 10px 10px 30px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              <FloodAreaMapKey
                locations={locations}
                showLocationsWithinFloodAreas={showLocationsWithinFloodAreas}
                setShowLocationsWithinFloodAreas={
                  setShowLocationsWithinFloodAreas
                }
                showLocationsOutsideFloodAreas={showLocationsOutsideFloodAreas}
                setShowLocationsOutsideFloodAreas={
                  setShowLocationsOutsideFloodAreas
                }
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
