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

export default function LiveMap({
  showSevereLocations,
  showWarningLocations,
  showAlertLocations,
  onFloodAreasUpdate
}) {
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)
  const [apiKey, setApiKey] = useState(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    if (onFloodAreasUpdate) {
      onFloodAreasUpdate({
        severeFloodAreas,
        warningFloodAreas,
        alertFloodAreas
      })
    }
  }, [severeFloodAreas, warningFloodAreas, alertFloodAreas])

  async function loadMap() {
    //get orgs locations
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

    //loop through locations and convert points to geojson to calculate bbox and compare
    const locationsCollection = []
    if (locations) {
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

      // load live alerts
      const options = {
        states: ['CURRENT'],
        boundingBox: {
          southWest: { latitude: bbox[1], longitude: bbox[0] },
          northEast: { latitude: bbox[3], longitude: bbox[2] }
        },
        channels: [],
        partnerId: ''
      }

      // get live alerts
      const { data: liveAlertsData, errorMessage } = await backendCall(
        { options: options },
        'api/alert/list',
        navigate
      )

      // loop through live alerts - loop through all locations to find affected locations
      for (const liveAlert of liveAlertsData.alerts) {
        const TA_CODE = getExtraInfo(
          liveAlert.mode.zoneDesc.placemarks[0].geometry.extraInfo,
          'TA_CODE'
        )
        const severity = liveAlert.type
        const floodArea = await getFloodAreaByTaCode(TA_CODE)

        for (const location of locations) {
          const locationType = location.additionals.other.location_data_type
          if (locationType === LocationDataType.X_AND_Y_COORDS) {
            const point = convertDataToGeoJsonFeature('Point', [
              location.coordinates.longitude,
              location.coordinates.latitude
            ])

            const intersects = turf.booleanIntersects(point, floodArea.geometry)

            if (intersects) {
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
          } else {
            // const flattenedFloodArea = flattenIfMultiPolygon(floodArea.geometry)
            // const flattenedLocation = flattenIfMultiPolygon(
            //   location.geometry.geoJson
            // )
            // let intersectionPoint
            // flattenedFloodArea.features.forEach((floodPolygon) => {
            //   flattenedLocation.features.forEach((locationPolygon) => {
            //     console.log('floodPolygon', floodPolygon)
            //     console.log('locationPolygon', locationPolygon)
            //     intersectionPoint = turf.intersect(
            //       floodPolygon.geometry,
            //       locationPolygon.geometry
            //     )
            //     // If an intersection is found, break out of the loop
            //     if (intersectionPoint) {
            //       console.log('Intersection found:', intersectionPoint)
            //       setShapes((prevShapes) => [
            //         ...prevShapes,
            //         location.geometry.geoJson
            //       ])
            //       return
            //     }
            //   })
            // })
            // if (intersectionPoint) {
            //   console.log('intersectionPoint', intersectionPoint)
            // }
          }
        }
      }
    } else {
      // show that user has no locations in account
    }
  }

  const flattenIfMultiPolygon = (geometry) => {
    if (geometry.type === 'MultiPolygon') {
      return turf.flatten(geometry)
    }
    return {
      type: 'FeatureCollection',
      features: [geometry]
    }
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

  useEffect(() => {
    ;(async () => {
      await loadMap()
      setLoading(false)
      console.log('finished')
    })()
  }, [])

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

  const [zoomLevel, setZoomLevel] = useState(null)

  const ZoomTracker = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom())
      }
    })

    return null
  }

  return (
    <>
      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <MapContainer
          center={[52.7152, -1.17349]}
          zoom={7}
          zoomControl={false}
          attributionControl={false}
          minZoom={7}
          maxBounds={maxBounds}
          className='live-map-container'
        >
          {osmTileLayer}
          {apiKey && tileLayerWithHeader}
          <ZoomControl position='bottomright' />
          <ZoomTracker />
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
                    <Popup />
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
                    <Popup />
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
                    <Popup />
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
        </MapContainer>
      )}
    </>
  )
}
