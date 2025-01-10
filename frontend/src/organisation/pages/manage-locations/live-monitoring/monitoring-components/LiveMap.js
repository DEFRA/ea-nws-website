import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useRef } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMapEvents
} from 'react-leaflet'
// Leaflet Marker Icon fix
import L from 'leaflet'
import { useState } from 'react'
import floodAlertIcon from '../../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../../common/assets/images/flood_warning.svg'
import floodWarningRemovedIcon from '../../../../../common/assets/images/flood_warning_removed.svg'
import floodSevereWarningIcon from '../../../../../common/assets/images/severe_flood_warning.svg'
import TileLayerWithHeader from '../../../../../common/components/custom/TileLayerWithHeader'
import { backendCall } from '../../../../../common/services/BackendService'
import { getSurroundingFloodAreas } from '../../../../../common/services/WfsFloodDataService'
import { locations } from '../dummy-data/LocationsDummyData'

export default function LiveMap({}) {
  const [apiKey, setApiKey] = useState(null)
  const [latitude, longitude] = [52.5619, -1.4649]

  // get flood area data
  useEffect(() => {
    async function fetchFloodAreaData() {}
    fetchFloodAreaData()
  }, [])

  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const [mapCenter, setMapCenter] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(null)

  useEffect(() => {
    async function fetchFloodAreaData() {
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
        // get center
        const center = map.getCenter()
        setMapCenter({ lat: center.lat, lng: center.lng })
      }
    })

    return null
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

  const getMarker = (type) => {
    console.log(type)
    switch (type) {
      case 'severe':
        return floodSevereWarningMarker
      case 'warning':
        return floodWarningMarker
      case 'alert':
        return floodAlertMarker
      case 'removed':
        return floodWarningRemovedMarker
    }
  }

  return (
    <>
      <MapContainer
        center={[52.7152, -1.17349]}
        zoom={7}
        zoomControl={false}
        attributionControl={false}
        minZoom={7}
        maxBounds={maxBounds}
        className={'live-map-container'}
      >
        {osmTileLayer}
        {apiKey && tileLayerWithHeader}
        <ZoomControl position='bottomright' />
        <ZoomTracker />
        {/* <ResetMapButton /> */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            icon={getMarker(location.type)}
            position={[
              location.coordinates.latitude,
              location.coordinates.longitude
            ]}
          >
            <Popup>
              Latitude: {location.coordinates.latitude}, Longitude:{' '}
              {location.coordinates.longitude}
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
    </>
  )
}
