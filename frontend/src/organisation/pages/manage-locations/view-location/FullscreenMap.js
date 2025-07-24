import { faArrowLeft, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as turf from '@turf/turf'
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
import LoadingSpinner from '../../../../common/components/custom/LoadingSpinner'
import TileLayerWithHeader from '../../../../common/components/custom/TileLayerWithHeader'
import LocationDataType from '../../../../common/enums/LocationDataType'
import { backendCall } from '../../../../common/services/BackendService'
import { convertDataToGeoJsonFeature } from '../../../../common/services/GeoJsonHandler'
import { getSurroundingFloodAreasFromShape } from '../../../../common/services/WfsFloodDataService'
import FullMapInteractiveKey from '../../../components/custom/FullMapInteractiveKey'

export default function FullscreenMap({
  showMap,
  setShowMap,
  // ensure locations passed to this component are in web format
  locations,
  filteredLocations = []
}) {
  const [apiKey, setApiKey] = useState(null)

  const [zoomLevel, setZoomLevel] = useState(8)
  const [showFloodWarningAreas, setShowFloodWarningAreas] = useState(true)
  const [showFloodAlertAreas, setShowFloodAlertAreas] = useState(true)
  const [showFloodExtents, setShowFloodExtents] = useState(true)
  const [alertAreaRefVisible, setAlertAreaRefVisible] = useState(false)
  const [warningAreaRefVisible, setWarningAreaRefVisible] = useState(false)

  const [showLocationsWithinFloodAreas, setShowLocationsWithinFloodAreas] =
    useState(true)
  const [showLocationsOutsideFloodAreas, setShowLocationsOutsideFloodAreas] =
    useState(true)
  const [showOnlyFilteredLocations, setShowOnlyFilteredLocations] =
    useState(true)

  const [centre, setCentre] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [warningAreas, setWarningArea] = useState([])
  const [alertAreas, setAlertArea] = useState([])
  const [loading, setLoading] = useState(true)
  const [mapLocations, setMapLocations] = useState([])

  useEffect(() => {
    loading && loadMap()
  }, [loading])
  const loadMap = async () => {
    // load all locations user is connected to onto map
    const locationsCollection = []
    if (locations && locations.length > 0) {
      // centre must be set to 0, 0 as map will be fit accordingly to locations loaded
      setCentre([0, 0])

      // convert each location to a geojson format
      // we also need to check if the location is in a flood area for filtering purposes
      for (const location of locations) {
        let feature
        const locationType = location.additionals.other.location_data_type

        // we need to convert points to geojson so we can calculate the bbox

        if (locationType === LocationDataType.X_AND_Y_COORDS) {
          // turf accepts in the format [lng,lat] - we save points as [lat,lng]
          feature = convertDataToGeoJsonFeature('Point', [
            location.coordinates.longitude,
            location.coordinates.latitude
          ])
        } else {
          feature = location.geometry.geoJson
        }

        location.withinFloodArea =
          location?.additionals?.other?.targetAreas?.length > 0

        locationsCollection.push(feature)
      }
      setMapLocations(locations)

      // fit map to all locations
      if (locationsCollection && locationsCollection.length > 0) {
        for (const location of locationsCollection) {
          const { alertArea, warningArea } =
            await getSurroundingFloodAreasFromShape(location)
          setAlertArea(...alertAreas, alertArea)
          setWarningArea(...warningAreas, warningArea)
        }
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
    } else {
      // no  locations, setting to centre of England
      setCentre([52.7152, -1.17349])
    }
    setLoading(false)
  }

  const FitBounds = () => {
    const map = useMap()
    if (bounds) {
      map.fitBounds(bounds)
    }
  }

  const fitBounds = useMemo(() => <FitBounds />, [bounds])

  const ZoomTracker = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom())
      }
    })

    return null
  }

  // Leaflet Marker Icon
  const DefaultIcon = L.icon({
    iconUrl,
    iconSize: [54.5, 64],
    iconAnchor: [27.5, 38.2]
  })
  L.Marker.prototype.options.icon = DefaultIcon

  async function getApiKey() {
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

  const alertAreaRef = useRef(null)
  const warningAreaRef = useRef(null)
  const shapefileRef = useRef(null)

  const handleCloseMap = () => {
    setShowMap(false)
  }

  const ResetMapButton = () => {
    const map = useMap()

    const handleReset = () => {
      map.setView(centre, 8)
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

  const onEachShapefileFeature = (feature, layer) => {
    layer.options.className = 'shapefile-area-pattern-fill'
    layer.setStyle({
      color: '#809095',
      weight: 2,
      fillOpacity: 1.0
    })
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

  useEffect(() => {
    showAreas()
  }, [showFloodWarningAreas, showFloodAlertAreas])

  const isInFilteredLocations = (location) => {
    if (showOnlyFilteredLocations || filteredLocations.length > 0) {
      return filteredLocations.some((filtered) => filtered.id === location.id)
    }
  }

  const isWithinFloodFilter = (location) => {
    const isInFloodArea =
      showLocationsWithinFloodAreas && location.withinFloodArea
    const isOutsideFloodArea =
      showLocationsOutsideFloodAreas && !location.withinFloodArea

    return isInFloodArea || isOutsideFloodArea
  }

  return (
    <>
      <div>
        <Modal show={showMap} onHide={handleCloseMap} fullscreen centered>
          <Modal.Body className='p-0'>
            <div style={{ display: 'flex', height: '100vh' }}>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div style={{ height: '100vh', width: '85%' }}>
                    <MapContainer
                      center={centre}
                      zoom={8}
                      zoomControl={false}
                      attributionControl={false}
                      minZoom={7}
                      maxBounds={maxBounds}
                      style={{ width: '100%', height: '100%' }}
                    >
                      {osmTileLayer}
                      {apiKey && tileLayerWithHeader}
                      {fitBounds}
                      <div role='group' aria-label='Interactive Map Controls'>
                        <ZoomControl position='bottomright' />
                        <ZoomTracker />
                        <ResetMapButton />
                        <ExitMapButton />
                      </div>
                      {mapLocations.length > 0 &&
                        mapLocations
                          .filter(isInFilteredLocations)
                          .filter(isWithinFloodFilter)
                          .map((location, index) => (
                            <div key={index}>
                              {location.additionals.other.location_data_type ===
                              LocationDataType.X_AND_Y_COORDS ? (
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
                                    {location.address}
                                  </Popup>
                                </Marker>
                              ) : (
                                <>
                                  {location.geometry.geoJson && (
                                    <GeoJSON
                                      data={location.geometry.geoJson}
                                      onEachFeature={onEachShapefileFeature}
                                      ref={(el) => {
                                        shapefileRef.current = el
                                      }}
                                    />
                                  )}{' '}
                                </>
                              )}
                            </div>
                          ))}
                      {warningAreas && (
                        <GeoJSON
                          key={warningAreas}
                          data={warningAreas}
                          style={{ color: '#f70202' }}
                          ref={(el) => {
                            warningAreaRef.current = el
                            setWarningAreaRefVisible(true)
                          }}
                        />
                      )}
                      {alertAreas && (
                        <GeoJSON
                          key={alertAreas}
                          data={alertAreas}
                          style={{ color: '#ffa200' }}
                          ref={(el) => {
                            alertAreaRef.current = el
                            setAlertAreaRefVisible(true)
                          }}
                        />
                      )}
                    </MapContainer>
                  </div>

                  <div
                    style={{ width: '15%', padding: '20px', overflowY: 'auto' }}
                  >
                    <FullMapInteractiveKey
                      showFloodWarningAreas={showFloodWarningAreas}
                      setShowFloodWarningAreas={setShowFloodWarningAreas}
                      showFloodAlertAreas={showFloodAlertAreas}
                      setShowFloodAlertAreas={setShowFloodAlertAreas}
                      showFloodExtents={showFloodExtents}
                      setShowFloodExtents={setShowFloodExtents}
                      showLocationsWithinFloodAreas={
                        showLocationsWithinFloodAreas
                      }
                      setShowLocationsWithinFloodAreas={
                        setShowLocationsWithinFloodAreas
                      }
                      showLocationsOutsideFloodAreas={
                        showLocationsOutsideFloodAreas
                      }
                      setShowLocationsOutsideFloodAreas={
                        setShowLocationsOutsideFloodAreas
                      }
                      showOnlyFilteredLocations={showOnlyFilteredLocations}
                      setShowOnlyFilteredLocations={
                        setShowOnlyFilteredLocations
                      }
                      locations={
                        showOnlyFilteredLocations
                          ? mapLocations.filter(isInFilteredLocations)
                          : mapLocations
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
