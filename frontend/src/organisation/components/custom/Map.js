import { faRotateLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  ZoomControl,
  useMap,
  useMapEvents
} from 'react-leaflet'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TileLayerWithHeader from '../../../common/components/custom/TileLayerWithHeader'
import LocationDataType from '../../../common/enums/LocationDataType'
import {
  getLocationOther,
  setSelectedBoundary
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  getBoundaries,
  getSurroundingFloodAreas,
  getSurroundingFloodAreasFromShape
} from '../../../common/services/WfsFloodDataService'
import {
  createAlertPattern,
  createShapefilePattern,
  createWarningPattern
} from './FloodAreaPatterns'
import { createExistingBoundaryPattern } from './PredefinedBoundaryPattern'

export default function Map({
  type,
  setCoordinates,
  showMapControls = true,
  zoomLevel = 12,
  showFloodWarningAreas = true,
  showFloodAlertAreas = true,
  showMarker = false,
  boundaryList,
  boundariesAlreadyAdded = [],
  manualCoords,
  accessibleMap = false
}) {
  const dispatch = useDispatch()
  const { latitude: currentLatitude, longitude: currentLongitude } =
    useSelector((state) => state?.session?.currentLocation?.coordinates) || {
      latitude: 0,
      longitude: 0
    }
  const { latitude, longitude } = manualCoords || {
    latitude: currentLatitude,
    longitude: currentLongitude
  }
  const locationGeometry = useSelector(
    (state) => state?.session?.currentLocation?.geometry
  )
  const currentLocationDataType = useSelector((state) =>
    getLocationOther(state, 'location_data_type')
  )

  const centre = [latitude, longitude]
  const [apiKey, setApiKey] = useState(null)
  const [marker, setMarker] = useState(null)
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const [shapeBounds, setShapeBounds] = useState(null)
  const [fitBoundsTriggered, setFitBoundsTriggered] = useState(false)

  // get flood area data
  useEffect(() => {
    async function fetchFloodAreaData() {
      let floodAreas
      if (
        currentLocationDataType === LocationDataType.BOUNDARY ||
        currentLocationDataType === LocationDataType.SHAPE_POLYGON ||
        currentLocationDataType === LocationDataType.SHAPE_LINE
      ) {
        floodAreas = await getSurroundingFloodAreasFromShape(
          JSON.parse(locationGeometry.geoJson)
        )
      } else {
        floodAreas = await getSurroundingFloodAreas(latitude, longitude)
      }
      const { alertArea, warningArea } = floodAreas
      setAlertArea(alertArea)
      setWarningArea(warningArea)
    }
    type !== 'boundary' && fetchFloodAreaData()
  }, [])

  // reset the map to selected location
  const ResetMapButton = () => {
    const map = useMap()

    const handleClick = () => {
      map.setView(centre, 12)
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

  const [keyboardNav, setKeyboardNav] = useState(false)
  const [showMapLegend, setShowMapLegend] = useState(false)
  const [mapLegendOpen, setMapLegendOpen] = useState(false)
  const [touchInput, setTouchInput] = useState(false)

  function AddMarker() {
    useMapEvents({
      click: (e) => {
        if (e.originalEvent.target.matches('.govuk-button') && accessibleMap) {
          const { lat, lng } = e.target.getCenter()
          setMarker([lat, lng])
          setCoordinates({ latitude: lat, longitude: lng })
        } else {
          const mapHeight = ref.current.clientHeight
          const mapWidth = ref.current.clientWidth
          const { x, y } = e.containerPoint
          if (
            !(
              x > mapWidth - 30 &&
              x < mapWidth - 9 &&
              y > mapHeight - 110 &&
              y < mapHeight - 77
            )
          ) {
            const { lat, lng } = e.latlng
            setMarker([lat, lng])
            setCoordinates({ latitude: lat, longitude: lng })
          }
        }
      },
      keydown: (e) => {
        if (e.originalEvent.code === 'Space' && accessibleMap) {
          e.originalEvent.preventDefault()
          const { lat, lng } = e.target.getCenter()
          setMarker([lat, lng])
          setCoordinates({ latitude: lat, longitude: lng })
        }
      }
    })
    if (showMarker && !marker) {
      setMarker([latitude, longitude])
    }
    return marker && <Marker position={marker} interactive={false} />
  }

  useEffect(() => {
    createWarningPattern()
    createAlertPattern()
    createExistingBoundaryPattern()
    createShapefilePattern()
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' && accessibleMap) {
        setKeyboardNav(true)
      }
    }

    const handleMouseDown = (e) => {
      setKeyboardNav(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pointerdown', handleMouseDown)
    window.addEventListener('wheel', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pointerdown', handleMouseDown)
      window.removeEventListener('wheel', handleMouseDown)
    }
  }, [])

  const handleFocus = () => {
    if (keyboardNav && accessibleMap) {
      setShowMapLegend(true)
    }
  }

  const handleBlur = () => {
    if (!accessibleMap) return
    setShowMapLegend(false)
    setMapLegendOpen(false)
    setTouchInput(false)
  }

  const handleTouchStart = () => {
    if (!accessibleMap) return
    setTouchInput(true)
  }

  const handleKeyDown = (e) => {
    if (!accessibleMap) return
    if (e.altKey && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      setMapLegendOpen(true)
    }
  }

  const handleCloseKeyboardLegend = () => {
    setMapLegendOpen(false)
  }

  const onEachWarningAreaFeature = (feature, layer) => {
    if (showFloodWarningAreas) {
      layer.options.className = 'warning-area-pattern-fill'

      layer.setStyle({
        color: '#f70202',
        weight: 2,
        fillOpacity: 0.25
      })
    } else {
      layer.setStyle({ opacity: 0, fillOpacity: 0 })
    }
  }

  const onEachAlertAreaFeature = (feature, layer) => {
    if (showFloodAlertAreas) {
      layer.options.className = 'alert-area-pattern-fill'

      layer.setStyle({
        color: '#ffa200',
        weight: 2,
        fillOpacity: 0.5
      })
    } else {
      layer.setStyle({ opacity: 0, fillOpacity: 0 })
    }
  }

  const onEachShapefileFeature = (feature, layer) => {
    layer.options.className = 'shapefile-area-pattern-fill'
    layer.setStyle({
      color: '#809095',
      weight: 2,
      fillOpacity: 1.0
    })
    setShapeBounds(layer.getBounds())
  }

  const onEachViewBoundaryFeature = (feature, layer) => {
    layer.options.className = 'existing-boundary-area-pattern-fill'
    layer.setStyle({
      opacity: 1,
      color: '#6d7475',
      weight: 2,
      fillOpacity: 0.6
    })
    setShapeBounds(layer.getBounds())
  }

  const FitBounds = () => {
    const map = useMap()

    useEffect(() => {
      if (shapeBounds && !fitBoundsTriggered) {
        map.fitBounds(shapeBounds)
        setFitBoundsTriggered(true)
      }
    }, [shapeBounds])
  }

  const alertAreaRef = useRef(null)
  const warningAreaRef = useRef(null)
  const boundaryRef = useRef(null)
  const shapefileRef = useRef(null)
  const [alertAreaRefVisible, setAlertAreaRefVisible] = useState(false)
  const [warningAreaRefVisible, setWarningAreaRefVisible] = useState(false)
  const [boundaryRefVisible, setBoundaryRefVisible] = useState(false)

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

  useEffect(() => {
    showAreas()
  }, [showFloodWarningAreas, showFloodAlertAreas])

  // boundary functionality
  const [boundaries, setBoundaries] = useState(null)
  const selectedBoundaryType = useSelector(
    (state) => state.session.selectedBoundaryType
  )
  const selectedBoundary = useSelector(
    (state) => state.session.selectedBoundary
  )

  // get boundary data if on boundary page
  useEffect(() => {
    async function fetchBoundaries() {
      if (
        currentLocationDataType === LocationDataType.BOUNDARY &&
        selectedBoundaryType
      ) {
        const data = await getBoundaries(selectedBoundaryType)
        if (data) {
          setBoundaries(data)
          // return list of boundaries for user to choose from
          boundaryList(data.features)

          dispatch(setSelectedBoundary(null))
        }
      }
    }
    if (type === 'boundary') {
      fetchBoundaries()
      setBoundaryStyles()
    }
  }, [selectedBoundaryType])

  useEffect(() => {
    // loads new boundary layers onto map after user has updated boundary type
    if (type === 'boundary' && boundaryRefVisible && boundaryRef.current) {
      boundaryRef.current.clearLayers()
      boundaryRef.current.addData(boundaries)
      setBoundaryStyles()
    }
  }, [boundaries])

  const setBoundaryStyles = () => {
    if (boundaryRefVisible && boundaryRef.current) {
      boundaryRef.current.eachLayer((layer) => {
        if (boundariesAlreadyAdded.includes(layer.feature.properties.TA_Name)) {
          layer.options.interactive = false
        } else if (
          selectedBoundary &&
          layer.feature.properties.TA_Name ===
            selectedBoundary.properties.TA_Name
        ) {
          layer.setStyle({
            color: '#6d7475',
            weight: 2,
            fillColor: '#7c8282',
            fillOpacity: 0.8
          })
        } else {
          layer.setStyle({
            color: '#6d7475',
            weight: 2,
            fillColor: '#e6e6e3',
            fillOpacity: 0.5
          })
        }
      })
    }
  }

  useEffect(() => {
    setBoundaryStyles()
  }, [selectedBoundary])

  let selectedLayerId = null

  const onEachBoundaryFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        const text = feature.properties.TA_Name
        layer
          .bindTooltip(text, {
            opacity: 1,
            className: 'custom-tooltip'
          })
          .openTooltip()
      },
      mouseout: () => {
        layer.unbindTooltip()
      }
    })

    if (boundariesAlreadyAdded.includes(layer.feature.properties.TA_Name)) {
      layer.options.className = 'existing-boundary-area-pattern-fill'
      layer.setStyle({
        opacity: 1,
        color: '#6d7475',
        weight: 2,
        fillOpacity: 0.6
      })
      layer.bringToFront()
    } else if (
      !selectedLayerId ||
      (selectedLayerId && selectedLayerId !== layer.feature.id)
    ) {
      layer.setStyle({
        color: '#6d7475',
        weight: 2,
        fillOpacity: 0.5,
        fillColor: '#e6e6e3'
      })

      // Allow boundaries to be selected by clicking on them
      layer.on({
        mouseover: () => {
          layer.setStyle({
            color: '#6d7475',
            weight: 2,
            fillColor: '#7c8282',
            fillOpacity: 0.8
          })
        },
        mouseout: () => {
          if (
            !selectedLayerId ||
            (selectedLayerId && selectedLayerId !== layer.feature.id)
          ) {
            layer.setStyle({
              color: '#6d7475',
              weight: 2,
              fillOpacity: 0.5,
              fillColor: '#e6e6e3'
            })
          }
        },
        click: () => {
          if (layer.options.interactive) {
            selectedLayerId = layer.feature.id
            dispatch(setSelectedBoundary(feature))
          }
        }
      })
    }
  }

  return (
    <div
      ref={ref}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
    >
      <MapContainer
        key={centre}
        center={centre}
        zoom={zoomLevel}
        zoomControl={false}
        attributionControl={false}
        minZoom={7}
        maxBounds={maxBounds}
        className='map-container-org'
      >
        {apiKey && apiKey !== 'error' ? (
          <>
            {showMapLegend && (
              <div
                className={`accessible-map-legend-conatiner govuk-body-s ${
                  mapLegendOpen ? 'keyboard' : ''
                }`}
              >
                {!mapLegendOpen ? (
                  <>
                    <span className='govuk-visually-hidden'>
                      Interactive map.{' '}
                    </span>
                    <kbd>Alt</kbd> + <kbd>K</kbd>{' '}
                    <span className='govuk-visually-hidden'>Show</span> keyboard
                    controls
                    <span className='govuk-visually-hidden'>.</span>
                  </>
                ) : (
                  <>
                    <h3 className='govuk-heading-m'>Keyboard</h3>
                    <div
                      className='map-legend-close-container'
                      tabIndex={0}
                      onClick={handleCloseKeyboardLegend}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className='warnings-selected-filter-icon'
                      />
                    </div>
                    <dl className='keyboard-list govuk-body-s'>
                      <div className='keyboard-list__item'>
                        <dt>Select a map control</dt>
                        <dd>
                          <kbd>Tab</kbd> or <kbd>Shift</kbd> + <kbd>Tab</kbd>
                        </dd>
                      </div>
                      <div className='keyboard-list__item'>
                        <dt>Move in large steps</dt>
                        <dd>
                          <kbd>&larr;</kbd>, <kbd>&uarr;</kbd>,{' '}
                          <kbd>&rarr;</kbd> or <kbd>&darr;</kbd>
                        </dd>
                      </div>
                      <div className='keyboard-list__item'>
                        <dt>Move in small steps</dt>
                        <dd>
                          <kbd>Shift</kbd> + <kbd>&larr;</kbd>,{' '}
                          <kbd>&uarr;</kbd>, <kbd>&rarr;</kbd> or{' '}
                          <kbd>&darr;</kbd>
                        </dd>
                      </div>
                      <div className='keyboard-list__item'>
                        <dt>Adjust zoom level</dt>
                        <dd>
                          <kbd>+</kbd> or <kbd>=</kbd> and <kbd>-</kbd> or{' '}
                          <kbd>_</kbd>
                        </dd>
                      </div>
                      <div className='keyboard-list__item'>
                        <dt>Drop pin</dt>
                        <dd>
                          <kbd>Space</kbd>
                        </dd>
                      </div>
                    </dl>
                  </>
                )}
              </div>
            )}
            {(showMapLegend || touchInput) && (
              <div className='map-marker' aria-label='Map marker'>
                <svg
                  width='66'
                  height='66'
                  viewBox='0 0 66 66'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    cx='33'
                    cy='33'
                    r='19'
                    stroke='black'
                    strokeWidth='2'
                    strokeDasharray='8 8'
                  />
                  <circle cx='33' cy='33' r='4' fill='#0B0C0C' />
                  <path d='M33 0L36.4641 12H29.5359L33 0Z' fill='#0B0C0C' />
                  <path d='M33 66L29.5359 54H36.4641L33 66Z' fill='#0B0C0C' />
                  <path d='M0 33L12 29.5359V36.4641L0 33Z' fill='#0B0C0C' />
                  <path d='M66 33L54 36.4641V29.5359L66 33Z' fill='#0B0C0C' />
                </svg>
              </div>
            )}
            {tileLayerWithHeader}
            {showMapControls && (
              <>
                <ZoomControl position='bottomright' />
                <ResetMapButton />
              </>
            )}
            {touchInput && (
              <div className='drop-pin-container'>
                <div className='leaflet-control'>
                  <button type='button' className='govuk-button'>
                    Drop a pin
                  </button>
                </div>
              </div>
            )}
            {currentLocationDataType !== LocationDataType.BOUNDARY &&
              currentLocationDataType !== LocationDataType.SHAPE_POLYGON &&
              currentLocationDataType !== LocationDataType.SHAPE_LINE && (
                <>
                  {type === 'drop' ? (
                    <AddMarker />
                  ) : (
                    <Marker position={centre} interactive={false} />
                  )}
                </>
              )}

            {alertArea && (
              <GeoJSON
                data={alertArea}
                onEachFeature={onEachAlertAreaFeature}
                ref={(el) => {
                  alertAreaRef.current = el
                  setAlertAreaRefVisible(true)
                }}
              />
            )}
            {warningArea && (
              <GeoJSON
                data={warningArea}
                onEachFeature={onEachWarningAreaFeature}
                ref={(el) => {
                  warningAreaRef.current = el
                  setWarningAreaRefVisible(true)
                }}
              />
            )}
            {boundaries &&
              currentLocationDataType === LocationDataType.BOUNDARY && (
                <GeoJSON
                  data={boundaries}
                  onEachFeature={onEachBoundaryFeature}
                  ref={(el) => {
                    boundaryRef.current = el
                    setBoundaryRefVisible(true)
                  }}
                />
              )}
            {locationGeometry &&
              (currentLocationDataType === LocationDataType.SHAPE_LINE ||
                currentLocationDataType === LocationDataType.SHAPE_POLYGON) && (
                <>
                  <GeoJSON
                    data={JSON.parse(locationGeometry.geoJson)}
                    onEachFeature={onEachShapefileFeature}
                    ref={(el) => {
                      shapefileRef.current = el
                    }}
                  />
                  <FitBounds />
                </>
              )}
            {locationGeometry &&
              currentLocationDataType === LocationDataType.BOUNDARY && (
                <>
                  <GeoJSON
                    data={JSON.parse(locationGeometry.geoJson)}
                    onEachFeature={onEachViewBoundaryFeature}
                    ref={(el) => {
                      shapefileRef.current = el
                    }}
                  />
                  <FitBounds />
                </>
              )}
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
    </div>
  )
}
