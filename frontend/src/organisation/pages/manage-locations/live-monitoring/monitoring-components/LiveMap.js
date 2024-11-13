import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  ZoomControl,
  useMapEvents
} from 'react-leaflet'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { useState } from 'react'
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
        console.log(alertArea)
        console.log(warningArea)
        setAlertArea(alertArea)
        setWarningArea(warningArea)
      } else {
        setAlertArea(null)
        setWarningArea(null)
      }
    }
    fetchFloodAreaData()
  }, [mapCenter, zoomLevel])

  const ZoomTracker = () => {
    //const [zoomLevel, setZoomLevel] = useState(6);

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

  return (
    <>
      <MapContainer
        center={[52.5619, -1.4649]}
        zoom={6}
        zoomControl={false}
        attributionControl={false}
        minZoom={7}
        maxBounds={maxBounds}
        className={'map-container'}
      >
        {apiKey && tileLayerWithHeader}
        <ZoomControl position='bottomright' />
        <ZoomTracker />
        {/* <ResetMapButton /> */}
        {locations.map((location, index) => (
          <Marker
            key={index}
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
          />
        )}
        {alertArea && (
          <GeoJSON
            key={alertArea}
            data={alertArea}
            style={{ color: '#ffa200' }}
          />
        )}
      </MapContainer>
    </>
  )
}
