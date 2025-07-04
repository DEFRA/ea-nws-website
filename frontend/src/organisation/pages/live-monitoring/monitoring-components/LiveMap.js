import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useState } from 'react'
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
// Leaflet Marker Icon fix
import * as turf from '@turf/turf'
import L from 'leaflet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import boundaryKeyIcon from '../../../../common/assets/images/boundary_already_added_icon.png'
import floodAlertIcon from '../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../common/assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../../../common/assets/images/severe_flood_warning.svg'
import FloodDataInformationPopup from '../../../../common/components/custom/FloodDataInformationPopup'
import LoadingSpinner from '../../../../common/components/custom/LoadingSpinner'
import TileLayerWithHeader from '../../../../common/components/custom/TileLayerWithHeader'
import AlertType from '../../../../common/enums/AlertType'
import LocationDataType from '../../../../common/enums/LocationDataType'
import { getAdditional } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { convertDataToGeoJsonFeature } from '../../../../common/services/GeoJsonHandler'
import { getFloodAreaByTaCode } from '../../../../common/services/WfsFloodDataService'
import { geoSafeToWebLocation } from '../../../../common/services/formatters/LocationFormatter'
import { createLiveMapShapePattern } from '../../../components/custom/FloodAreaPatterns'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function LiveMap ({
  showSevereLocations,
  showWarningLocations,
  showAlertLocations,
  onFloodAreasUpdate,
  isDisabled,
  setAccountHasLocations
}) {
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)
  const [apiKey, setApiKey] = useState(null)
  const [loading, setLoading] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(null)

  // tracking locations affected
  const [locationsAffected, setLocationsAffected] = useState([])

  // shapes and boundarys
  const [shapes, setShapes] = useState([])
  // Severe locations
  const [severePoints, setSeverePoints] = useState([])
  const [severeFloodAreas, setSevereFloodAreas] = useState([])
  // Warning locations
  const [warningPoints, setWarningPoints] = useState([])
  const [warningFloodAreas, setWarningFloodAreas] = useState([])
  // Alert locations
  const [alertPoints, setAlertPoints] = useState([])
  const [alertFloodAreas, setAlertFloodAreas] = useState([])

  // flood information popup
  const [showFloodInformationData, setShowFloodInformationData] =
    useState(false)
  const [locationsFloodInformation, setLocationsFloodInformation] = useState([])

  useEffect(() => {
    createLiveMapShapePattern()
  }, [])

  useEffect(() => {
    onFloodAreasUpdate({
      locationsAffected: [...new Set(locationsAffected)].length,
      severeFloodAreasAmount: severePoints.length,
      warningFloodAreasAmount: warningPoints.length,
      alertFloodAreasAmount: alertPoints.length
    })
  }, [loading])

  // load live alerts
  useEffect(() => {
    ;(async () => {
      await loadMap()
      setLoading(false)
    })()
  }, [])

  const loadMap = async () => {
    // reset data before loading
    setSeverePoints([])
    setSevereFloodAreas([])
    setWarningPoints([])
    setWarningFloodAreas([])
    setAlertPoints([])
    setAlertFloodAreas([])
    setShapes([])
    setLocationsAffected([])

    // get orgs locations
    const { data: locationsData, errorMessage } = await backendCall(
      { orgId },
      'api/elasticache/list_locations',
      navigate
    )

    const locations = []
    if (locationsData && !errorMessage) {
      locationsData.forEach((location) => {
        locations.push(geoSafeToWebLocation(location))
      })
    }

    // loop through locations and convert points(xy coords locations) to geojson point to calculate bbox and compare
    // if a location is a shape or boundary, save the geojson
    const locationsCollection = []
    if (locations.length > 0) {
      locations.forEach((location) => {
        let feature
        const locationType = location.additionals.other.location_data_type

        if (locationType === LocationDataType.X_AND_Y_COORDS) {
          // turf accepts in the format [lng,lat] - we save points as [lat,lng]
          feature = convertDataToGeoJsonFeature('Point', [
            location.coordinates.longitude,
            location.coordinates.latitude
          ])
        } else {
          feature = location.geometry.geoJson
        }
        locationsCollection.push(feature)
      })

      // calculate boundary around locations
      const geoJsonFeatureCollection =
        turf.featureCollection(locationsCollection)

      const bbox = turf.bbox(geoJsonFeatureCollection)

      const { data: partnerId } = await backendCall(
        'data',
        'api/service/get_partner_id'
      )

      const options = {
        states: ['CURRENT'],
        boundingBox: {
          southWest: {
            latitude: parseInt(bbox[1] * 10 ** 6),
            longitude: parseInt(bbox[0] * 10 ** 6)
          },
          northEast: {
            latitude: parseInt(bbox[3] * 10 ** 6),
            longitude: parseInt(bbox[2] * 10 ** 6)
          }
        },
        channels: [],
        partnerId
      }

      // load live alerts
      const { data: liveAlertsData, errorMessage } = await backendCall(
        { options },
        'api/alert/list',
        navigate
      )

      if (!errorMessage) {
        for (const liveAlert of liveAlertsData?.alerts) {
          const locationPromises = locations.map((location) =>
            processLocation(
              location,
              liveAlert
            )
          )
          await Promise.all(locationPromises)
        }
      }
    } else {
      setAccountHasLocations(false)
    }
  }

  const processLocation = async(
    location,
    liveAlert
  ) => {

    const TA_CODE = getAdditional(
      liveAlert.mode.zoneDesc.placemarks[0].extraInfo,
      'TA_CODE'
    )

    const { coordinates, geometry, additionals } = location
    const locationType = additionals.other.location_data_type
    const locationIntersectsWithFloodArea = additionals.other?.targetAreas?.some(
      (targetArea) => targetArea.TA_CODE === TA_CODE
    )

    if (!locationIntersectsWithFloodArea) return

    const severity = liveAlert.type
    const lastUpdatedTime = new Date(liveAlert.effectiveDate * 1000)

    const floodArea = await getFloodAreaByTaCode(TA_CODE)

    setLocationsAffected((prevLoc) => [...prevLoc, location.id])

    // create point with required data
    // use exact location for x and y coord locations
    // use the lat, lng given for the flood area for shape locations
    const point = {
      ...convertDataToGeoJsonFeature('Point', [
        locationType === LocationDataType.X_AND_Y_COORDS
          ? coordinates.longitude
          : Number(floodArea.properties.longitude.replace(',', '.')),
        locationType === LocationDataType.X_AND_Y_COORDS
          ? coordinates.latitude
          : Number(floodArea.properties.latitude.replace(',', '.'))
      ]),
      properties: {
        floodData: {
          type: severity,
          name: floodArea.properties.TA_Name,
          code: floodArea.properties.TA_CODE,
          lastUpdatedTime
        },
        locationData: location
      }
    }

    if (locationType === LocationDataType.X_AND_Y_COORDS) {
      point.geometry.coordinates[0][0][0] = adjustCoords(
        severity,
        point.geometry.coordinates[0][0][0]
      )
    } else {
      geometry.geoJson.properties = {
        ...geometry.geoJson.properties,
        isShape: true
      }
      setShapes((prevShape) => [...prevShape, geometry.geoJson])
    }

    processFloodArea(severity, point, floodArea)
  }

  const processFloodArea = (severity, point, floodArea) => {
    switch (severity) {
      case AlertType.SEVERE_FLOOD_WARNING:
        setSeverePoints((prevPoints) => [...prevPoints, point])
        setSevereFloodAreas((prevAreas) => [...prevAreas, floodArea])
        break

      case AlertType.FLOOD_WARNING:
        setWarningPoints((prevPoints) => [...prevPoints, point])
        setWarningFloodAreas((prevAreas) => [...prevAreas, floodArea])
        break

      case AlertType.FLOOD_ALERT:
        setAlertPoints((prevPoints) => [...prevPoints, point])
        setAlertFloodAreas((prevAreas) => [...prevAreas, floodArea])
        break
    }
  }

  const adjustCoords = (severity, longitude) => {
    switch (severity) {
      case AlertType.SEVERE_FLOOD_WARNING:
        return longitude
      case AlertType.FLOOD_WARNING:
        return Number((parseFloat(longitude) - 0.003).toFixed(6))
      case AlertType.FLOOD_ALERT:
        return Number((parseFloat(longitude) + 0.003).toFixed(6))
    }
  }

  // give shapes or boundarys a dashed line fill pattern
  const onEachShapeFeature = (feature, layer) => {
    layer.options.className = 'live-map-shape-pattern-fill'
    layer.setStyle({
      color: '#809095',
      weight: 2,
      fillOpacity: 1.0
    })
  }

  const floodSevereWarningMarker = L.icon({
    iconUrl: floodSevereWarningIcon,
    iconSize: [57, 45],
    iconAnchor: [12, 41]
  })

  const floodWarningMarker = L.icon({
    iconUrl: floodWarningIcon,
    iconSize: [57, 45],
    iconAnchor: [12, 41]
  })

  const floodAlertMarker = L.icon({
    iconUrl: floodAlertIcon,
    iconSize: [57, 45],
    iconAnchor: [12, 41]
  })

  /* const floodWarningRemovedMarker = L.icon({
    iconUrl: floodWarningRemovedIcon,
    iconSize: [45, 45],
    iconAnchor: [12, 41]
  }) */

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
        attribution='� OpenStreetMap contributors'
      />
    ),
    []
  )

  const ZoomTracker = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom())
      }
    })

    return null
  }

  // flood information popup
  const viewFloodInformationData = (data) => {
    setShowFloodInformationData(true)
    setLocationsFloodInformation(findAllFloodAreasAffectingLocation(data))
  }

  const findAllFloodAreasAffectingLocation = (data) => {
    const allPoints = [...severePoints, ...warningPoints, ...alertPoints]

    return allPoints
      .filter(
        (point) => point.properties.locationData.id === data.locationData.id
      )
      .map((point) => point.properties)
  }

  // map key
  const [visibleFeatures, setVisibleFeatures] = useState([])

  const FeatureTracker = () => {
    const features = [
      ...severeFloodAreas,
      ...warningFloodAreas,
      ...alertFloodAreas,
      ...shapes
    ]
    const map = useMap()

    useEffect(() => {
      // Run on initial load when the map is ready
      checkVisibleFeatures()
    }, [])

    useMapEvents({
      moveend: () => checkVisibleFeatures(),
      zoomend: () => checkVisibleFeatures()
    })

    const checkVisibleFeatures = () => {
      const bounds = map.getBounds()

      // convert map bounds to GeoJSON polygon for intersection checking
      const viewportGeoJSON = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [bounds.getWest(), bounds.getSouth()],
              [bounds.getEast(), bounds.getSouth()],
              [bounds.getEast(), bounds.getNorth()],
              [bounds.getWest(), bounds.getNorth()],
              [bounds.getWest(), bounds.getSouth()]
            ]
          ]
        }
      }

      // filter features that intersect with current bounds
      const visibleFeatures = features.filter((feature) => {
        // handle all other geometry types
        return turf.booleanIntersects(feature, viewportGeoJSON)
      })

      // Only update state if the result is different
      setVisibleFeatures(visibleFeatures)
    }

    return null
  }

  const keyTypes = {
    noKey: 'noKey',
    boundaryOrShape: 'boundaryOrShape',
    floodAreas: 'floodAreas'
  }

  const [mapKeyType, setMapKeyType] = useState({ keyType: keyTypes.noKey })

  useEffect(() => {
    visibleFeatures.forEach((feature) => {
      if (zoomLevel >= 12 && feature?.properties?.TA_CODE) {
        setMapKeyType(keyTypes.floodAreas)
      } else if (feature?.properties?.isShape) {
        setMapKeyType(keyTypes.boundaryOrShape)
      } else {
        setMapKeyType(keyTypes.noKey)
      }
    })
  }, [visibleFeatures])

  const LiveMapKey = () => {
    switch (mapKeyType) {
      case keyTypes.floodAreas:
        return (
          <div className='org-flood-warning-key'>
            <div className='org-flood-warning-item'>
              <div className='org-flood-warning-square warning-square' />
              <span className='org-flood-warning-text'>
                Severe flood warnings and flood warnings area
              </span>
            </div>

            <div className='org-flood-alert-item'>
              <div className='org-flood-warning-square alert-square' />
              <span className='org-flood-warning-text'>Flood alert area</span>
            </div>
          </div>
        )

      case keyTypes.boundaryOrShape:
        return (
          <div className='org-flood-warning-key'>
            <div className='org-flood-warning-item'>
              <img src={boundaryKeyIcon} alt='Shapefile' />
              <span className='org-flood-warning-text'>Boundary</span>
            </div>
          </div>
        )
      case keyTypes.noKey:
    }
  }

  // locations affected list under map when there are less than 20 affected locations
  const totalAlerts = [...severePoints, ...warningPoints, ...alertPoints]

  const getLocationsAffectedFloodIcon = (alertLevel) => {
    switch (alertLevel) {
      case AlertType.SEVERE_FLOOD_WARNING:
        return floodSevereWarningIcon
      case AlertType.FLOOD_WARNING:
        return floodWarningIcon
      case AlertType.FLOOD_ALERT:
        return floodAlertIcon
    }
  }

  const FloodInfoMemo = useMemo(() => {
    return (
      <FloodDataInformationPopup
        locationsFloodInformation={locationsFloodInformation}
        onClose={(event) => {
          event.preventDefault()
          setShowFloodInformationData(false)
          setLocationsFloodInformation([])
        }}
      />
    )
  }, [locationsFloodInformation])

  return (
    <>
      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          {showFloodInformationData && FloodInfoMemo}

          <MapContainer
            center={[52.7152, -1.17349]}
            zoom={7}
            zoomControl={false}
            attributionControl={false}
            minZoom={7}
            maxBounds={maxBounds}
            scrollWheelZoom={!isDisabled}
            className='live-map-container'
            style={{
              filter: isDisabled ? 'grayscale(100%)' : 'none'
            }}
          >
            <FeatureTracker />
            {isDisabled && (
              <div className='live-map-disabled'>
                <Link
                  to={orgManageLocationsUrls.add.options}
                  className='govuk-link govuk-!-font-size-19'
                >
                  Add locations
                </Link>
              </div>
            )}
            {osmTileLayer}
            {apiKey && tileLayerWithHeader}
            {!isDisabled && <ZoomControl position='bottomright' />}
            <ZoomTracker />
            {/* locations affected by live flood alert areas */}
            {showAlertLocations && (
              <>
                {alertPoints.length > 0 &&
                  alertPoints.map((alertPoint, index) => (
                    <Marker
                      key={index}
                      position={[
                        alertPoint.geometry.coordinates[0][0][1],
                        alertPoint.geometry.coordinates[0][0][0]
                      ]}
                      icon={floodAlertMarker}
                    >
                      <Popup offset={[17, -20]}>
                        <Link
                          onClick={() =>
                            viewFloodInformationData(alertPoint.properties)}
                        >
                          {
                            alertPoint.properties.locationData.additionals
                              .locationName
                          }
                        </Link>
                      </Popup>
                    </Marker>
                  ))}

                {alertFloodAreas.length > 0 &&
                  zoomLevel >= 12 &&
                  alertFloodAreas.map((floodArea, index) => (
                    <GeoJSON
                      key={index}
                      data={floodArea}
                      style={{ color: '#ffa200' }}
                    />
                  ))}
              </>
            )}
            {/* locations affected by live flood warning areas */}
            {showWarningLocations && (
              <>
                {warningPoints.length > 0 &&
                  warningPoints.map((warningPoint, index) => (
                    <Marker
                      key={index}
                      position={[
                        warningPoint.geometry.coordinates[0][0][1],
                        warningPoint.geometry.coordinates[0][0][0]
                      ]}
                      icon={floodWarningMarker}
                    >
                      <Popup offset={[17, -20]}>
                        <Link
                          onClick={() =>
                            viewFloodInformationData(warningPoint.properties)}
                        >
                          {
                            warningPoint.properties.locationData.additionals
                              .locationName
                          }
                        </Link>
                      </Popup>
                    </Marker>
                  ))}

                {warningFloodAreas.length > 0 &&
                  zoomLevel >= 12 &&
                  warningFloodAreas.map((floodArea, index) => (
                    <GeoJSON
                      key={index}
                      data={floodArea}
                      style={{ color: '#f70202' }}
                    />
                  ))}
              </>
            )}
            {/* locations affected by live flood severe warning areas */}
            {showSevereLocations && (
              <>
                {severePoints.length > 0 &&
                  severePoints.map((severePoint, index) => (
                    <Marker
                      key={index}
                      position={[
                        severePoint.geometry.coordinates[0][0][1],
                        severePoint.geometry.coordinates[0][0][0]
                      ]}
                      icon={floodSevereWarningMarker}
                    >
                      <Popup offset={[17, -20]}>
                        <Link
                          onClick={() =>
                            viewFloodInformationData(severePoint.properties)}
                        >
                          {
                            severePoint.properties.locationData.additionals
                              .locationName
                          }
                        </Link>
                      </Popup>
                    </Marker>
                  ))}

                {severeFloodAreas.length > 0 &&
                  zoomLevel >= 12 &&
                  severeFloodAreas.map((floodArea, index) => (
                    <GeoJSON
                      key={index}
                      data={floodArea}
                      style={{ color: '#f70202' }}
                    />
                  ))}
              </>
            )}{' '}
            {/* boundary's or shape files uploaded that are affected by live flood areas */}
            {shapes.map((shape, index) => (
              <GeoJSON
                key={index}
                data={shape}
                onEachFeature={onEachShapeFeature}
              />
            ))}
          </MapContainer>

          {totalAlerts.length > 0 && (
            <>
              <LiveMapKey /> <br />
            </>
          )}

          {totalAlerts.length > 0 && totalAlerts.length <= 20 && (
            <>
              <h3 class='govuk-heading-s'>Locations affected</h3>
              {totalAlerts
                .reduce((rows, location, index) => {
                  if (index % 2 === 0) {
                    rows.push([location]) // Start a new row
                  } else {
                    rows[rows.length - 1].push(location) // Add to the last row
                  }
                  return rows
                }, [])
                .map((row, rowIndex) => (
                  <div
                    className='govuk-grid-row govuk-!-margin-bottom-3'
                    key={rowIndex}
                  >
                    {row.map((location, colIndex) => (
                      <div
                        className='govuk-grid-column-one-half'
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                        key={colIndex}
                      >
                        <img
                          src={getLocationsAffectedFloodIcon(
                            location.properties.floodData.type
                          )}
                          alt='Flood Icon'
                          style={{
                            width: '55px',
                            height: '40px',
                            flexShrink: 0
                          }}
                        />
                        <Link
                          onClick={() =>
                            viewFloodInformationData(location.properties)}
                          style={{ flex: 1 }}
                        >
                          {
                            location.properties.locationData.additionals
                              .locationName
                          }
                        </Link>
                      </div>
                    ))}
                  </div>
                ))}
            </>
          )}
        </>
      )}
    </>
  )
}
