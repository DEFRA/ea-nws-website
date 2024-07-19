import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useRef, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap
} from 'react-leaflet'
import { useSelector } from 'react-redux'
import { getFloodTargetArea } from '../services/WfsFloodDataService'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default function Map({ types, setFloodAreas, selectedFloodArea }) {
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const alertAreaRef = useRef(null)
  const warningAreaRef = useRef(null)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const { latitude, longitude } = selectedLocation.coordinates

  useEffect(() => {
    async function fetchFloodAreaData() {
      const { alertArea, warningArea } = await getFloodTargetArea(
        latitude,
        longitude
      )
      setAlertArea(alertArea)
      setWarningArea(warningArea)
    }
    fetchFloodAreaData()
  }, [])

  useEffect(() => {
    if (alertArea && warningArea) {
      if (types.includes('severe')) {
        setFloodAreas(warningArea.features)
      } else if (types.includes('alert')) {
        setFloodAreas(alertArea.features)
      } else {
        setFloodAreas(alertArea.features, warningArea.features)
      }
    }
  }, [types, alertArea, warningArea])

  useEffect(() => {
    if (selectedFloodArea) {
      HighlightSelectedArea(selectedFloodArea)
    }
  }, [selectedFloodArea])

  const HighlightSelectedArea = (selectedArea) => {
    if (warningAreaRef.current) {
      warningAreaRef.current.eachLayer((layer) => {
        if (
          layer.feature.properties.gml_id === selectedArea.properties.gml_id
        ) {
          layer.setStyle({
            color: 'black',
            weight: 3,
            fillColor: '#f70202'
          })
        } else {
          layer.setStyle({
            fillColor: '#f70202'
          })
        }
      })
    }

    if (alertAreaRef.current) {
      alertAreaRef.current.eachLayer((layer) => {
        if (
          layer.feature.properties.gml_id === selectedArea.properties.gml_id
        ) {
          layer.setStyle({
            color: 'black',
            weight: 3,
            fillColor: '#ffa200'
          })
        } else {
          layer.setStyle({
            fillColor: '#ffa200'
          })
        }
      })
    }
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

  const ResetMapButton = () => {
    const map = useMap()

    const handleClick = () => {
      map.setView([latitude, longitude], 14)
    }

    return (
      <div className="reset-map-button" onClick={handleClick}>
        <FontAwesomeIcon icon={faRotateLeft} size="2x" />
      </div>
    )
  }

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        className="map-container"
      >
        <TileLayer url="https://api.os.uk/maps/raster/v1/zxy/Outdoor_3857/{z}/{x}/{y}.png?key=tjk8EgPGUk5tD2sYxAbW3yudGJOhOr8a" />
        <ZoomControl position="bottomright" />
        <Marker position={[latitude, longitude]}>
          <Popup />
        </Marker>
        {warningArea && types.includes('severe') && (
          <GeoJSON
            data={warningArea}
            style={{ color: '#f70202' }}
            ref={warningAreaRef}
          />
        )}
        {alertArea && types.includes('alert') && (
          <GeoJSON
            data={alertArea}
            style={{ color: '#ffa200' }}
            ref={alertAreaRef}
          />
        )}
        <ResetMapButton />
      </MapContainer>
    </>
  )
}
