import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl
} from 'react-leaflet'
import { useSelector } from 'react-redux'
import { getFloodTargetArea } from '../services/GetFloodTargetAreas'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default function Map({ types }) {
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  useEffect(() => {
    async function fetchFloodAreaData() {
      const { alertArea, warningArea } = await getFloodTargetArea(
        selectedLocation.latitude,
        selectedLocation.longitude
      )
      setAlertArea(alertArea)
      setWarningArea(warningArea)
    }
    fetchFloodAreaData()
  }, [])

  // Leaflet Marker Icon fix
  const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon

  return (
    <>
      <MapContainer
        center={[selectedLocation.latitude, selectedLocation.longitude]}
        zoom={14}
        //style={{ height: '40vh', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
        className="map-container"
      >
        <TileLayer url="https://api.os.uk/maps/raster/v1/zxy/Outdoor_3857/{z}/{x}/{y}.png?key=tjk8EgPGUk5tD2sYxAbW3yudGJOhOr8a" />
        <ZoomControl position="bottomright" />
        <Marker
          position={[selectedLocation.latitude, selectedLocation.longitude]}
        >
          <Popup />
        </Marker>
        {warningArea && types.includes('warning') && (
          <GeoJSON data={warningArea} style={{ color: '#f70202' }} />
        )}
        {alertArea && types.includes('alert') && (
          <GeoJSON data={alertArea} style={{ color: '#ffa200' }} />
        )}
      </MapContainer>
    </>
  )
}
