import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvents
} from 'react-leaflet'
// Leaflet Marker Icon fix
import * as turf from '@turf/turf'
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../../common/assets/images/flood_warning.svg'
import floodWarningRemovedIcon from '../../../../../common/assets/images/flood_warning_removed.svg'
import floodSevereWarningIcon from '../../../../../common/assets/images/severe_flood_warning.svg'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import TileLayerWithHeader from '../../../../../common/components/custom/TileLayerWithHeader'
import AlertType from '../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import { backendCall } from '../../../../../common/services/BackendService'
import { convertDataToGeoJsonFeature } from '../../../../../common/services/GeoJsonHandler'
import { getFloodAreaByTaCode } from '../../../../../common/services/WfsFloodDataService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { createLiveMapShapePattern } from '../../../../components/custom/FloodAreaPatterns'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import FloodDataInformationPopup from './FloodDataInformationPopup'

export default function LiveMap({
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

  //shapes and boundarys
  const [shapes, setShapes] = useState([])
  //Severe locations
  const [severePoints, setSeverePoints] = useState([])
  const [severeFloodAreas, setSevereFloodAreas] = useState([])
  //Warning locations
  const [warningPoints, setWarningPoints] = useState([])
  const [warningFloodAreas, setWarningFloodAreas] = useState([])
  //Alert locations
  const [alertPoints, setAlertPoints] = useState([])
  const [alertFloodAreas, setAlertFloodAreas] = useState([])

  //flood information popup
  const [showFloodInformationData, setShowFloodInformationData] =
    useState(false)
  const [locationsFloodInformation, setLocationsFloodInformation] = useState([])

  useEffect(() => {
    createLiveMapShapePattern()
  }, [])

  //flood information popup
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

  // load live alerts
  useEffect(() => {
    ;(async () => {
      await loadMap()
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    onFloodAreasUpdate({
      severeFloodAreasAmount: severeFloodAreas.length,
      warningFloodAreasAmount: warningFloodAreas.length,
      alertFloodAreasAmount: alertFloodAreas.length
    })
  }, [loading])

  const loadMap = async () => {
    // reset data before loading
    setSeverePoints([])
    setSevereFloodAreas([])
    setWarningPoints([])
    setWarningFloodAreas([])
    setAlertPoints([])
    setAlertFloodAreas([])
    setShapes([])

    // get orgs locations
    const { data: locationsData, errorMessage } = await backendCall(
      { orgId },
      'api/elasticache/list_locations',
      navigate
    )

    const locations = []
    if (locationsData) {
      locationsData.forEach((location) => {
        locations.push(geoSafeToWebLocation(location))
      })
    }

    // loop through locations and convert points to geojson to calculate bbox and compare
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

      const options = {
        states: ['CURRENT'],
        boundingBox: {
          southWest: { latitude: bbox[1], longitude: bbox[0] },
          northEast: { latitude: bbox[3], longitude: bbox[2] }
        },
        channels: [],
        partnerId: ''
      }

      // load live alerts
      const { data: liveAlertsData, errorMessage } = await backendCall(
        { options: options },
        'api/alert/list',
        navigate
      )

      // loop through live alerts - loop through all locations to find affected locations
      for (const liveAlert of liveAlertsData?.alerts) {
        const TA_CODE = getExtraInfo(
          liveAlert.mode.zoneDesc.placemarks[0].geometry.extraInfo,
          'TA_CODE'
        )

        const severity = liveAlert.type
        const updatedTime = getUpdatedTime(liveAlert.effectiveDate)
        const floodArea = await getFloodAreaByTaCode(TA_CODE)

        for (const location of locations) {
          processLocation(location, floodArea, severity, updatedTime)
        }
      }
    } else {
      console.log('hit')
      setAccountHasLocations(false)
    }
  }

  const processLocation = (location, floodArea, severity, updatedTime) => {
    const { coordinates, geometry, additionals } = location
    const locationType = additionals.other.location_data_type

    // add required data to flood area point
    const createPointWithProperties = (coords) => {
      const point = convertDataToGeoJsonFeature('Point', coords)
      const floodData = {
        type: severity,
        name: floodArea.properties.TA_Name,
        code: floodArea.properties.TA_CODE,
        updatedTime: updatedTime
      }

      return {
        ...point,
        properties: {
          ...point.properties,
          locationData: location,
          floodData: floodData
        }
      }
    }

    // for xy coord locations
    const handleXYCoordinates = () => {
      const point = createPointWithProperties([
        coordinates.longitude,
        coordinates.latitude
      ])

      if (turf.booleanIntersects(point, floodArea.geometry)) {
        // for xycoord locations, we need to avoid overlapping warning icons on map
        point.geometry.coordinates[0] = adjustCoords(
          severity,
          point.geometry.coordinates[0]
        )

        processFloodArea(severity, point, floodArea)
      }
    }

    // for shapes or boundary's locations
    const handleGeoJsonLocation = () => {
      if (turf.booleanIntersects(geometry.geoJson, floodArea.geometry)) {
        const point = createPointWithProperties([
          floodArea.properties.longitude.replace(',', '.'),
          floodArea.properties.latitude.replace(',', '.')
        ])

        setShapes((prevShape) => [...prevShape, geometry.geoJson])
        processFloodArea(severity, point, floodArea)
      }
    }

    if (locationType === LocationDataType.X_AND_Y_COORDS) {
      handleXYCoordinates()
    } else {
      handleGeoJsonLocation()
    }
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
        return (parseFloat(longitude) - 0.003).toFixed(6)
      case AlertType.FLOOD_ALERT:
        return (parseFloat(longitude) + 0.003).toFixed(6)
    }
  }

  // required to convert the unix time from geosafe
  const getUpdatedTime = (unixTime) => {
    const date = new Date(unixTime * 1000)

    const options = { hour: 'numeric', minute: '2-digit', hour12: true }
    let time = date.toLocaleTimeString('en-GB', options).toLowerCase()
    time = time.replace(' ', '') // Remove space between time and AM/PM

    const day = date.getDate()
    const month = date.toLocaleString('en-GB', { month: 'long' })
    const year = date.getFullYear()

    return `${time} on ${day} ${month} ${year}`
  }

  const getExtraInfo = (extraInfo, id) => {
    if (extraInfo) {
      for (let i = 0; i < extraInfo.length; i++) {
        if (extraInfo[i].id === id) {
          return extraInfo[i].value?.s
        }
      }
    }
    return ''
  }

  const ZoomTracker = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom())
      }
    })

    return null
  }

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

  const floodWarningRemovedMarker = L.icon({
    iconUrl: floodWarningRemovedIcon,
    iconSize: [45, 45],
    iconAnchor: [12, 41]
  })

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

  //map key

  // locations affected list under map
  const locationsAffected = [...severePoints, ...warningPoints, ...alertPoints]

  const getFloodIcon = (alertLevel) => {
    switch (alertLevel) {
      case AlertType.SEVERE_FLOOD_WARNING:
        return floodSevereWarningIcon
      case AlertType.FLOOD_WARNING:
        return floodWarningIcon
      case AlertType.FLOOD_ALERT:
        return floodAlertIcon
    }
  }

  return (
    <>
      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          {showFloodInformationData && (
            <FloodDataInformationPopup
              locationsFloodInformation={locationsFloodInformation}
              onClose={() => {
                setShowFloodInformationData(false)
                setLocationsFloodInformation([])
              }}
            />
          )}

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
                        alertPoint.geometry.coordinates[1],
                        alertPoint.geometry.coordinates[0]
                      ]}
                      icon={floodAlertMarker}
                    >
                      <Popup offset={[17, -20]}>
                        <Link
                          onClick={() =>
                            viewFloodInformationData(alertPoint.properties)
                          }
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
                        warningPoint.geometry.coordinates[1],
                        warningPoint.geometry.coordinates[0]
                      ]}
                      icon={floodWarningMarker}
                    >
                      <Popup offset={[17, -20]}>
                        <Link
                          onClick={() =>
                            viewFloodInformationData(warningPoint.properties)
                          }
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
                        severePoint.geometry.coordinates[1],
                        severePoint.geometry.coordinates[0]
                      ]}
                      icon={floodSevereWarningMarker}
                    >
                      <Popup offset={[17, -20]}>
                        <Link
                          onClick={() =>
                            viewFloodInformationData(severePoint.properties)
                          }
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

          {locationsAffected.length > 0 && (
            <>
              <FloodWarningKey /> <br />
            </>
          )}

          {locationsAffected.length > 0 && locationsAffected.length <= 20 && (
            <>
              <h3 class='govuk-heading-s'>Locations affected</h3>
              {locationsAffected
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
                          src={getFloodIcon(location.properties.floodData.type)}
                          alt='Flood Icon'
                          style={{
                            width: '55px',
                            height: '40px',
                            flexShrink: 0
                          }}
                        />
                        <Link
                          onClick={() =>
                            viewFloodInformationData(location.properties)
                          }
                          style={{ flex: 1 }}
                        >
                          {location.properties.floodData.name}
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
